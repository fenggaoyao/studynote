import report from "./reporter";
import helper from "./helpers";

export default class Performance {
  constructor(options) {
    this.options = options;
    this.waitToSend = false;
  }

  extractData() {
    let data = {};
    //Check if the browser suppots the timing APIs
    if (
      window.performance &&
      window.performance.getEntriesByType !== undefined
    ) {
      data.resources = window.performance.getEntriesByType("resource");
      data.marks = window.performance.getEntriesByType("mark");
      data.measures = window.performance.getEntriesByType("measure");
    } else if (
      window.performance &&
      window.performance.webkitGetEntriesByType !== undefined
    ) {
      data.resources = window.performance.webkitGetEntriesByType("resource");
      data.marks = window.performance.webkitGetEntriesByType("mark");
      data.measures = window.performance.webkitGetEntriesByType("measure");
    } else {
      console.log("您的浏览器不支持window performance");
      return false;
    }
    if (window.performance.timing) {
      data.perfTiming = window.performance.timing;
    } else {
      console.log("您的浏览器不支持performance timing");
      return false;
    }
    return data;
  }

  //resource计算
  caculateResource(data) {
    data.allResourcesCalc = data.resources.map((currR, i, arr) => {
      //crunch the resources data into something easier to work with
      const isRequest = currR.name.indexOf("http") === 0;
      let urlFragments, maybeFileName, fileExtension;

      if (isRequest) {
        urlFragments = currR.name.match(/:\/\/(.[^/]+)([^?]*)\??(.*)/);
        maybeFileName = urlFragments[2].split("/").pop();
        fileExtension = maybeFileName.substr(
          (Math.max(0, maybeFileName.lastIndexOf(".")) || Infinity) + 1
        );
      } else {
        urlFragments = ["", location.host];
        fileExtension = currR.name.split(":")[0];
      }

      const currRes = {
        name: currR.name,
        domain: urlFragments[1],
        initiatorType:
          currR.initiatorType || fileExtension || "SourceMap or Not Defined",
        fileExtension: fileExtension || "XHR or Not Defined",
        loadtime: currR.duration,
        fileType: helper.getFileType(fileExtension, currR.initiatorType),
        isRequestToHost: urlFragments[1] === location.host,
      };

      for (let attr in currR) {
        if (typeof currR[attr] !== "function") {
          currRes[attr] = currR[attr];
        }
      }

      if (currR.requestStart) {
        currRes.requestStartDelay = currR.requestStart - currR.startTime;
        currRes.dns = currR.domainLookupEnd - currR.domainLookupStart;
        currRes.tcp = currR.connectEnd - currR.connectStart;
        currRes.ttfb = currR.responseStart - currR.startTime;
        currRes.requestDuration = currR.responseStart - currR.requestStart;
      }
      if (currR.secureConnectionStart) {
        currRes.ssl = currR.connectEnd - currR.secureConnectionStart;
      }

      return currRes;
    });
  }

  calculateRequest(data) {
    //filter out non-http[s] and sourcemaps
    data.requestsOnly = data.allResourcesCalc.filter((currR) => {
      return currR.name.indexOf("http") === 0 && !currR.name.match(/js.map$/);
    });

    //get counts
    data.initiatorTypeCounts = helper.getItemCount(
      data.requestsOnly.map((currR, i, arr) => {
        return currR.initiatorType || currR.fileExtension;
      }),
      "initiatorType"
    );

    data.initiatorTypeCountHostExt = helper.getItemCount(
      data.requestsOnly.map((currR, i, arr) => {
        return (
          (currR.initiatorType || currR.fileExtension) +
          " " +
          (currR.isRequestToHost ? "(host)" : "(external)")
        );
      }),
      "initiatorType"
    );

    data.requestsByDomain = helper.getItemCount(
      data.requestsOnly.map((currR, i, arr) => currR.domain),
      "domain"
    );

    data.fileTypeCountHostExt = helper.getItemCount(
      data.requestsOnly.map((currR, i, arr) => {
        return (
          currR.fileType +
          " " +
          (currR.isRequestToHost ? "(host)" : "(external)")
        );
      }),
      "fileType"
    );

    data.fileTypeCounts = helper.getItemCount(
      data.requestsOnly.map((currR, i, arr) => currR.fileType),
      "fileType"
    );

    const tempResponseEnd = {};
    //TODO: make immutable
    data.requestsOnly.forEach((currR) => {
      const entry =
        data.requestsByDomain.filter((a) => a.domain == currR.domain)[0] || {};

      const lastResponseEnd = tempResponseEnd[currR.domain] || 0;

      currR.duration = entry.duration || currR.responseEnd - currR.startTime;

      if (lastResponseEnd <= currR.startTime) {
        entry.durationTotalParallel =
          (entry.durationTotalParallel || 0) + currR.duration;
      } else if (lastResponseEnd < currR.responseEnd) {
        entry.durationTotalParallel =
          (entry.durationTotalParallel || 0) +
          (currR.responseEnd - lastResponseEnd);
      }
      tempResponseEnd[currR.domain] = currR.responseEnd || 0;
      entry.durationTotal = (entry.durationTotal || 0) + currR.duration;
    });

    //Request counts
    data.hostRequests = data.requestsOnly.filter(
      (domain) => domain.domain === location.host
    ).length;

    data.currAndSubdomainRequests = data.requestsOnly.filter(
      (domain) =>
        domain.domain.split(".").slice(-2).join(".") ===
        location.host.split(".").slice(-2).join(".")
    ).length;

    data.crossDocDomainRequests = data.requestsOnly.filter(
      (domain) => !helper.endsWith(domain.domain, document.domain)
    ).length;

    data.hostSubdomains = data.requestsByDomain.filter(
      (domain) =>
        helper.endsWith(
          domain.domain,
          location.host.split(".").slice(-2).join(".")
        ) && domain.domain !== location.host
    ).length;
  }

  caculateSlowest(data) {
    data.slowestCalls = [];
    data.average = undefined;

    if (data.allResourcesCalc.length > 0) {
      data.slowestCalls = data.allResourcesCalc
        .filter((a) => a.name !== location.href)
        .sort((a, b) => b.duration - a.duration);

      data.average = Math.floor(
        data.slowestCalls.reduceRight((a, b) => {
          if (typeof a !== "number") {
            return a.duration + b.duration;
          }
          return a + b.duration;
        }) / data.slowestCalls.length
      );
    }
  }

  calculatePerfTiming(data) {
    const startTime = data.perfTiming.navigationStart;
    const perfTimingCalc = {
      pageLoadTime:
        data.perfTiming.loadEventEnd - data.perfTiming.navigationStart,
      output: [],
    };

    for (let perfProp in data.perfTiming) {
      if (
        data.perfTiming[perfProp] &&
        typeof data.perfTiming[perfProp] === "number"
      ) {
        perfTimingCalc[perfProp] = data.perfTiming[perfProp] - startTime;
        perfTimingCalc.output.push({
          name: perfProp,
          "time (ms)": data.perfTiming[perfProp] - startTime,
        });
      }
    }
    perfTimingCalc.output.sort(
      (a, b) => (a["time (ms)"] || 0) - (b["time (ms)"] || 0)
    );
    data.perfTimingCalc = perfTimingCalc;
  }

  start() {
    if (document.readyState !== "complete") {
      this.waitToSend = true;
      window.onload = () => {
        if (this.waitToSend) {
          this.waitToSend = false;
          this.reportData();
        }
      };
    } else {
      this.waitToSend = false;
      this.reportData();
    }
  }

  reportData() {
    let data = this.extractData();
    this.calculatePerfTiming(data);
    this.caculateResource(data);
    this.calculateRequest(data);
    this.caculateSlowest(data);

    const url = this.options.url;
    let { sampleRate } = this.options.performance;

    let reportData = {
      marks: data.marks,
      measures: data.measures,
      perfTimingCalc: data.perfTimingCalc,
      allResourcesCalc: data.allResourcesCalc,
      requestsOnly: data.requestsOnly,
      initiatorTypeCounts: data.initiatorTypeCounts,
      initiatorTypeCountHostExt: data.initiatorTypeCountHostExt,
      requestsByDomain: data.requestsByDomain,
      fileTypeCountHostExt: data.fileTypeCountHostExt,
      fileTypeCounts: data.fileTypeCounts,
      hostRequests: data.hostRequests,
      currAndSubdomainRequests: data.currAndSubdomainRequests,
      crossDocDomainRequests: data.crossDocDomainRequests,
      hostSubdomains: data.hostSubdomains,
      slowestCalls: data.slowestCalls,
      average: data.average,
    };
    console.log(reportData);
    if (Math.random() < sampleRate) {
      report(url, reportData);
    }
  }
}
