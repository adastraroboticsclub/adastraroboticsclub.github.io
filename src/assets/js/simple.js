function t() {}
const e = t=>t;
function n(t, e) {
    for (const n in e)
        t[n] = e[n];
    return t
}
function r(t) {
    return t()
}
function a() {
    return Object.create(null)
}
function o(t) {
    t.forEach(r)
}
function i(t) {
    return "function" == typeof t
}
function s(t, e) {
    return t != t ? e == e : t !== e || t && "object" == typeof t || "function" == typeof t
}
function l(e, ...n) {
    if (null == e)
        return t;
    const r = e.subscribe(...n);
    return r.unsubscribe ? ()=>r.unsubscribe() : r
}
function c(t) {
    let e;
    return l(t, (t=>e = t))(),
    e
}
function d(t, e, r, a) {
    return t[1] && a ? n(r.ctx.slice(), t[1](a(e))) : r.ctx
}
function b(t, e, n) {
    return t.set(n),
    e
}
const h = "undefined" != typeof window;
let m = h ? ()=>window.performance.now() : ()=>Date.now()
  , p = h ? t=>requestAnimationFrame(t) : t;
const f = new Set;
function g(t) {
    f.forEach((e=>{
        e.c(t) || (f.delete(e),
        e.f())
    }
    )),
    0 !== f.size && p(g)
}
function y(t) {
    let e;
    return 0 === f.size && p(g),
    {
        promise: new Promise((n=>{
            f.add(e = {
                c: t,
                f: n
            })
        }
        )),
        abort() {
            f.delete(e)
        }
    }
}
let k = !1;
function v(t, e, n, r) {
    for (; t < e; ) {
        const a = t + (e - t >> 1);
        n(a) <= r ? t = a + 1 : e = a
    }
    return t
}
function S(t) {
    if (!t)
        return document;
    const e = t.getRootNode ? t.getRootNode() : t.ownerDocument;
    return e && e.host ? e : t.ownerDocument
}
function T(t) {
    const e = C("style");
    return function(t, e) {
        (function(t, e) {
            t.appendChild(e)
        }
        )(t.head || t, e),
        e.sheet
    }(S(t), e),
    e.sheet
}
function M(t) {
    t.parentNode.removeChild(t)
}
function C(t) {
    return document.createElement(t)
}

const G = new Map;
let z, U = 0;
function V(t, e, n, r, a, o, i, s=0) {
    const l = 16.666 / r;
    let c = "{\n";
    for (let t = 0; t <= 1; t += l) {
        const r = e + (n - e) * o(t);
        c += 100 * t + `%{${i(r, 1 - r)}}\n`
    }
    const u = c + `100% {${i(n, 1 - n)}}\n}`
      , d = `__svelte_${function(t) {
        lete = 5381
          , n = t.length;
        for (; n--; )
            e = (e << 5) - e ^ t.charCodeAt(n);
        return e >>> 0
    }(u)}_${s}`
      , b = S(t)
      , {stylesheet: h, rules: m} = G.get(b) || function(t, e) {
        const n = {
            stylesheet: T(e),
            rules: {}
        };
        return G.set(t, n),
        n
    }(b, t);
    m[d] || (m[d] = !0,
    h.insertRule(`@keyframes ${d} ${u}`, h.cssRules.length));
    const p = t.style.animation || "";
    return t.style.animation = `${p ? `${p}, ` : ""}${d} ${r}ms linear ${a}ms 1 both`,
    U += 1,
    d
}
function J(t, e) {
    const n = (t.style.animation || "").split(", ")
      , r = n.filter(e ? t=>t.indexOf(e) < 0 : t=>-1 === t.indexOf("__svelte"))
      , a = n.length - r.length;
    a && (t.style.animation = r.join(", "),
    U -= a,
    U || p((()=>{
        U || (G.forEach((t=>{
            const {ownerNode: e} = t.stylesheet;
            e && M(e)
        }
        )),
        G.clear())
    }
    )))
}

const q = []
  , Z = []
  , X = []
  , Q = []
  , tt = Promise.resolve();
let et = !1;
function nt() {
    et || (et = !0,
    tt.then(st))
}
function rt(t) {
    X.push(t)
}
const at = new Set;
let ot, it = 0;
function ct() {
    return ot || (ot = Promise.resolve(),
    ot.then((()=>{
        ot = null
    }
    ))),
    ot
}
function dispatch(t, e, n) {
    t.dispatchEvent(function(t, e, {bubbles: n=!1, cancelable: r=!1}={}) {
        const a = document.createEvent("CustomEvent");
        return a.initCustomEvent(t, n, r, e),
        a
    }(`${e ? "intro" : "outro"}${n}`))
}

function Animator(n, r, a) {
    let o, s, l = r(n, a), c = !1, u = 0;
    function d() {
        o && J(n, o)
    }
    function b() {
        const {delay: r=0, duration: a=300, easing: i=e, tick: b=t, css: h} = l || gt;
        h && (o = V(n, 0, 1, a, r, i, h, u++)),
        b(0, 1);
        const p = m() + r
          , f = p + a;
        s && s.abort(),
        c = !0,
        rt((()=>dispatch(n, !0, "start"))),
        s = y((t=>{
            if (c) {
                if (t >= f)
                    return b(1, 0),
                    dispatch(n, !0, "end"),
                    d(),
                    c = !1;
                if (t >= p) {
                    const e = i((t - p) / a);
                    b(e, 1 - e)
                }
            }
            return c
        }
        ))
    }
    let h = !1;
    return {
        start() {
            h || (h = !0,
            J(n),
            i(l) ? (l = l(),
            ct().then(b)) : b())
        },
        invalidate() {
            h = !1
        },
        end() {
            c && (d(),
            c = !1)
        }
    }
}
function MatrixAnimation(t, {duration: e=1e3, delay: n=0, reverse: r=!1, absolute: a=!1, pointerEvents: o=!0}) {
    let i = recurseNodes(t)
      , s = i.map((t=>t.nodeValue.length))
      , l = i.map((t=>t.nodeValue)).join("")
      , c = l.split(" ").map((t=>{
        let e = "";
        for (let n = 0; n < t.length; n++)
            e += " ";
        return e
    }
    )).join(" ")
      , u = "" + c
      , d = ~~(l.length * (r ? .25 : 1.5))
      , b = r ? .1 : .8
      , h = r ? -1 : 1;
    return a && (t.style.position = "absolute",
    t.style.top = "0"),
    o || (t.style.pointerEvents = "none"),
    {
        duration: e,
        delay: n,
        tick: t=>{
            var e;
            e = t,
            t = -(Math.cos(Math.PI * e) - 1) / 2,
            t = Math.pow(t, 2),
            r && (t = 1 - t);
            let n, a = ~~(l.length * Math.abs(t * h)), o = ~~(2 * (.5 - Math.abs(t - .5)) * d);
            if (n = r ? c.slice(0, Math.max(a - 1 - o, 0)) : l.slice(0, a),
            Math.random() < .5 && t < 1 && 0 != t)
                for (let t = 0; t < 20; t++) {
                    let e = t / 20
                      , n = a + ~~((1 - Math.random()) * d * e);
                    " " != u[n] && (u = Math.random() > b ? charSwap(u, n, l[n]) : charSwap(u, n, randomMatrixLetter(r)))
                }
            r ? (n += u.slice(Math.max(a - 1 - o, 0), Math.max(a - 1, 0)),
            n += l.slice(Math.max(a - 1, 0))) : (n += u.slice(a, a + o),
            n += c.slice(a + o));
            let m = 0;
            for (let t = 0; t < i.length; t++)
                i[t].nodeValue = n.slice(m, m + s[t]),
                m += s[t]
        }
    }
}
function recurseNodes(t) {
    let e = [];
    return t.childNodes.length > 0 && t.childNodes.forEach((t=>{
        t.nodeType == Node.TEXT_NODE ? " " != t.nodeValue && (t.nodeValue = t.nodeValue.replace(/(\n|\r|\t)/gm, ""),
        e.push(t)) : e.push(...recurseNodes(t))
    }
    )),
    e
}
const MatrixLetters = "—~±§|[].+$^@*()•x%!?#";
function randomMatrixLetter(t) {
    return t ? "x"[~~(Math.random() * "x".length)] : MatrixLetters[~~(Math.random() * MatrixLetters.length)]
}
function charSwap(t, e, n) {
    return e > t.length - 1 || e < 0 ? t : t.substring(0, e) + n + t.substring(e + 1)
}

element = document.getElementById("header")
animation = Animator(element, MatrixAnimation, {
  duration: 1500
})
animation.start()