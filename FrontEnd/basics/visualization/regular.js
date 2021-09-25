/**
 * 
 * @param {给定边数} edges 
 * @param {起点} x 
 * @param {终点} y 
 * @param {给定边数} step 
 */
function regularShape(edges = 3, x, y, step) {
    const ret = [];
    const delta = Math.PI * (1 - (edges - 2) / edges);
    let p = new Vector2D(x, y);
    const dir = new Vector2D(step, 0);
    ret.push(p);
    for (let i = 0; i < edges; i++) {
        p = p.copy().add(dir.rotate(delta));
        ret.push(p);
    }
    return ret;
}