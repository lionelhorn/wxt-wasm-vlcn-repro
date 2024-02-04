var Fi = Object.defineProperty;
var Oi = (ie, te, D) => te in ie ? Fi(ie, te, {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: D
}) : ie[te] = D;
var J = (ie, te, D) => (Oi(ie, typeof te != "symbol" ? te + "" : te, D), D), An = (ie, te, D) => {
  if (!te.has(ie)) throw TypeError("Cannot " + D);
};
var b = (ie, te, D) => (An(ie, te, "read from private field"), D ? D.call(ie) : te.get(ie)), j = (ie, te, D) => {
  if (te.has(ie)) throw TypeError("Cannot add the same private member more than once");
  te instanceof WeakSet ? te.add(ie) : te.set(ie, D);
}, Z = (ie, te, D, Tt) => (An(ie, te, "write to private field"), Tt ? Tt.call(ie, D) : te.set(ie, D), D);
var pe = (ie, te, D) => (An(ie, te, "access private method"), D);
(function() {
  "use strict";
  var ge, ut, _t, wt, xn, Ot, bs, Dt, ys, lt, ft, pt, fe, bt, Xe, Ye, Nt, As, le, Ze, ze, _e, ne, Ge, Je, Ue, yt, vn,
    Ut, xs, $t, vs, Qe, gt, Bt, Es, ht, et, $e, At, Ie, xt, zt;

  function ie(h) {
    return typeof h == "function" ? { main: h } : h;
  }

  var te = (() => {
    var h = self.location.href;
    return function(s = {}) {
      var n = s, c, m;
      n.ready = new Promise((e, t) => {
        c = e, m = t;
      });
      var f = Object.assign({}, n), A = "./this.program", q = (e, t) => {
        throw t;
      }, F = typeof window == "object", N = typeof importScripts == "function", I = "", L;
      (F || N) && (N ? I = self.location.href : typeof document < "u" && document.currentScript && (I = document.currentScript.src), h && (I = h), I.indexOf("blob:") !== 0 ? I = I.substr(0, I.replace(/[?#].*/, "").lastIndexOf("/") + 1) : I = "", N && (L = e => {
        var t = new XMLHttpRequest;
        return t.open("GET", e, !1), t.responseType = "arraybuffer", t.send(null), new Uint8Array(t.response);
      }));
      var oe = n.print || console.log.bind(console), re = n.printErr || console.error.bind(console);
      Object.assign(n, f), f = null, n.thisProgram && (A = n.thisProgram), n.quit && (q = n.quit);
      var V;
      n.wasmBinary && (V = n.wasmBinary);
      var l = n.noExitRuntime || !0;
      typeof WebAssembly != "object" && he("no native wasm support detected");
      var u, a = !1, _, y, E, K, C, Q, P, O;

      function W() {
        var e = u.buffer;
        n.HEAP8 = y = new Int8Array(e), n.HEAP16 = K = new Int16Array(e), n.HEAPU8 = E = new Uint8Array(e), n.HEAPU16 = new Uint16Array(e), n.HEAP32 = C = new Int32Array(e), n.HEAPU32 = Q = new Uint32Array(e), n.HEAPF32 = P = new Float32Array(e), n.HEAPF64 = O = new Float64Array(e);
      }

      var X = [], ce = [], be = [], ye = [], B = 0;

      function ve() {
        var e = n.preRun.shift();
        X.unshift(e);
      }

      var G = 0, qe = null;

      function he(e) {
        throw n.onAbort && n.onAbort(e), e = "Aborted(" + e + ")", re(e), a = !0, _ = 1, e = new WebAssembly.RuntimeError(e + ". Build with -sASSERTIONS for more info."), m(e), e;
      }

      function Te(e) {
        return e.startsWith("data:application/octet-stream;base64,");
      }

      var Ce;
      if (n.locateFile) {
        if (Ce = "crsqlite.wasm", !Te(Ce)) {
          var Nn = Ce;
          Ce = n.locateFile ? n.locateFile(Nn, I) : I + Nn;
        }
      } else Ce = new URL("crsqlite.wasm", self.location.href).href;

      function Un(e) {
        if (e == Ce && V) return new Uint8Array(V);
        if (L) return L(e);
        throw "both async and sync fetching of the wasm failed";
      }

      function gi(e) {
        return V || !F && !N || typeof fetch != "function" ? Promise.resolve().then(() => Un(e)) : fetch(e, { credentials: "same-origin" }).then(t => {
          if (!t.ok) throw "failed to load wasm binary file at '" + e + "'";
          return t.arrayBuffer();
        }).catch(() => Un(e));
      }

      function $n(e, t, r) {
        return gi(e).then(i => WebAssembly.instantiate(i, t)).then(i => i).then(r, i => {
          re(`failed to asynchronously prepare wasm: ${i}`), he(i);
        });
      }

      function _i(e, t) {
        var r = Ce;
        return V || typeof WebAssembly.instantiateStreaming != "function" || Te(r) || typeof fetch != "function" ? $n(r, e, t) : fetch(r, { credentials: "same-origin" }).then(i => WebAssembly.instantiateStreaming(i, e).then(t, function(o) {
          return re(`wasm streaming compile failed: ${o}`), re("falling back to ArrayBuffer instantiation"), $n(r, e, t);
        }));
      }

      var U, se;

      function Bn(e) {
        this.name = "ExitStatus", this.message = `Program terminated with exit(${e})`, this.status = e;
      }

      var Qt = e => {
        for (; 0 < e.length;) e.shift()(n);
      };

      function me(e, t = "i8") {
        switch (t.endsWith("*") && (t = "*"), t) {
          case"i1":
            return y[e >> 0];
          case"i8":
            return y[e >> 0];
          case"i16":
            return K[e >> 1];
          case"i32":
            return C[e >> 2];
          case"i64":
            he("to do getValue(i64) use WASM_BIGINT");
          case"float":
            return P[e >> 2];
          case"double":
            return O[e >> 3];
          case"*":
            return Q[e >> 2];
          default:
            he(`invalid type for getValue: ${t}`);
        }
      }

      function Fe(e, t, r = "i8") {
        switch (r.endsWith("*") && (r = "*"), r) {
          case"i1":
            y[e >> 0] = t;
            break;
          case"i8":
            y[e >> 0] = t;
            break;
          case"i16":
            K[e >> 1] = t;
            break;
          case"i32":
            C[e >> 2] = t;
            break;
          case"i64":
            he("to do setValue(i64) use WASM_BIGINT");
          case"float":
            P[e >> 2] = t;
            break;
          case"double":
            O[e >> 3] = t;
            break;
          case"*":
            Q[e >> 2] = t;
            break;
          default:
            he(`invalid type for setValue: ${r}`);
        }
      }

      var zn = typeof TextDecoder < "u" ? new TextDecoder("utf8") : void 0, H = (e, t, r) => {
        var i = t + r;
        for (r = t; e[r] && !(r >= i);) ++r;
        if (16 < r - t && e.buffer && zn) return zn.decode(e.subarray(t, r));
        for (i = ""; t < r;) {
          var o = e[t++];
          if (o & 128) {
            var g = e[t++] & 63;
            if ((o & 224) == 192) i += String.fromCharCode((o & 31) << 6 | g); else {
              var d = e[t++] & 63;
              o = (o & 240) == 224 ? (o & 15) << 12 | g << 6 | d : (o & 7) << 18 | g << 12 | d << 6 | e[t++] & 63, 65536 > o ? i += String.fromCharCode(o) : (o -= 65536, i += String.fromCharCode(55296 | o >> 10, 56320 | o & 1023));
            }
          } else i += String.fromCharCode(o);
        }
        return i;
      }, Qn = (e, t) => {
        for (var r = 0, i = e.length - 1; 0 <= i; i--) {
          var o = e[i];
          o === "." ? e.splice(i, 1) : o === ".." ? (e.splice(i, 1), r++) : r && (e.splice(i, 1), r--);
        }
        if (t) for (; r; r--) e.unshift("..");
        return e;
      }, Me = e => {
        var t = e.charAt(0) === "/", r = e.substr(-1) === "/";
        return (e = Qn(e.split("/").filter(i => !!i), !t).join("/")) || t || (e = "."), e && r && (e += "/"), (t ? "/" : "") + e;
      }, wi = e => {
        var t = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(e).slice(1);
        return e = t[0], t = t[1], !e && !t ? "." : (t && (t = t.substr(0, t.length - 1)), e + t);
      }, Mt = e => {
        if (e === "/") return "/";
        e = Me(e), e = e.replace(/\/$/, "");
        var t = e.lastIndexOf("/");
        return t === -1 ? e : e.substr(t + 1);
      }, pi = () => {
        if (typeof crypto == "object" && typeof crypto.getRandomValues == "function") return e => crypto.getRandomValues(e);
        he("initRandomDevice");
      }, Mn = e => (Mn = pi())(e);

      function Vt() {
        for (var e = "", t = !1, r = arguments.length - 1; -1 <= r && !t; r--) {
          if (t = 0 <= r ? arguments[r] : "/", typeof t != "string") throw new TypeError("Arguments to path.resolve must be strings");
          if (!t) return "";
          e = t + "/" + e, t = t.charAt(0) === "/";
        }
        return e = Qn(e.split("/").filter(i => !!i), !t).join("/"), (t ? "/" : "") + e || ".";
      }

      var an = [], tt = e => {
        for (var t = 0, r = 0; r < e.length; ++r) {
          var i = e.charCodeAt(r);
          127 >= i ? t++ : 2047 >= i ? t += 2 : 55296 <= i && 57343 >= i ? (t += 4, ++r) : t += 3;
        }
        return t;
      }, nt = (e, t, r, i) => {
        if (!(0 < i)) return 0;
        var o = r;
        i = r + i - 1;
        for (var g = 0; g < e.length; ++g) {
          var d = e.charCodeAt(g);
          if (55296 <= d && 57343 >= d) {
            var v = e.charCodeAt(++g);
            d = 65536 + ((d & 1023) << 10) | v & 1023;
          }
          if (127 >= d) {
            if (r >= i) break;
            t[r++] = d;
          } else {
            if (2047 >= d) {
              if (r + 1 >= i) break;
              t[r++] = 192 | d >> 6;
            } else {
              if (65535 >= d) {
                if (r + 2 >= i) break;
                t[r++] = 224 | d >> 12;
              } else {
                if (r + 3 >= i) break;
                t[r++] = 240 | d >> 18, t[r++] = 128 | d >> 12 & 63;
              }
              t[r++] = 128 | d >> 6 & 63;
            }
            t[r++] = 128 | d & 63;
          }
        }
        return t[r] = 0, r - o;
      }, Vn = [];

      function Wn(e, t) {
        Vn[e] = { input: [], Ub: [], ec: t }, fn(e, bi);
      }

      var bi = {
        open(e) {
          var t = Vn[e.node.ic];
          if (!t) throw new S(43);
          e.Vb = t, e.seekable = !1;
        }, close(e) {
          e.Vb.ec.lc(e.Vb);
        }, lc(e) {
          e.Vb.ec.lc(e.Vb);
        }, read(e, t, r, i) {
          if (!e.Vb || !e.Vb.ec.Ac) throw new S(60);
          for (var o = 0, g = 0; g < i; g++) {
            try {
              var d = e.Vb.ec.Ac(e.Vb);
            } catch {
              throw new S(29);
            }
            if (d === void 0 && o === 0) throw new S(6);
            if (d == null) break;
            o++, t[r + g] = d;
          }
          return o && (e.node.timestamp = Date.now()), o;
        }, write(e, t, r, i) {
          if (!e.Vb || !e.Vb.ec.uc) throw new S(60);
          try {
            for (var o = 0; o < i; o++) e.Vb.ec.uc(e.Vb, t[r + o]);
          } catch {
            throw new S(29);
          }
          return i && (e.node.timestamp = Date.now()), o;
        }
      }, yi = {
        Ac() {
          e:{
            if (!an.length) {
              var e = null;
              if (typeof window < "u" && typeof window.prompt == "function" ? (e = window.prompt("Input: "), e !== null && (e += `
`)) : typeof readline == "function" && (e = readline(), e !== null && (e += `
`)), !e) {
                var t = null;
                break e;
              }
              t = Array(tt(e) + 1), e = nt(e, t, 0, t.length), t.length = e, an = t;
            }
            t = an.shift();
          }
          return t;
        }, uc(e, t) {
          t === null || t === 10 ? (oe(H(e.Ub, 0)), e.Ub = []) : t != 0 && e.Ub.push(t);
        }, lc(e) {
          e.Ub && 0 < e.Ub.length && (oe(H(e.Ub, 0)), e.Ub = []);
        }, ad() {
          return {
            Xc: 25856,
            Zc: 5,
            Wc: 191,
            Yc: 35387,
            Vc: [3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          };
        }, bd() {
          return 0;
        }, cd() {
          return [24, 80];
        }
      }, Ai = {
        uc(e, t) {
          t === null || t === 10 ? (re(H(e.Ub, 0)), e.Ub = []) : t != 0 && e.Ub.push(t);
        }, lc(e) {
          e.Ub && 0 < e.Ub.length && (re(H(e.Ub, 0)), e.Ub = []);
        }
      };

      function jn(e, t) {
        var r = e.Qb ? e.Qb.length : 0;
        r >= t || (t = Math.max(t, r * (1048576 > r ? 2 : 1.125) >>> 0), r != 0 && (t = Math.max(t, 256)), r = e.Qb, e.Qb = new Uint8Array(t), 0 < e.Sb && e.Qb.set(r.subarray(0, e.Sb), 0));
      }

      var M = {
        Yb: null, Xb() {
          return M.createNode(null, "/", 16895, 0);
        }, createNode(e, t, r, i) {
          if ((r & 61440) === 24576 || (r & 61440) === 4096) throw new S(63);
          return M.Yb || (M.Yb = {
            dir: {
              node: {
                Wb: M.Fb.Wb,
                Tb: M.Fb.Tb,
                fc: M.Fb.fc,
                mc: M.Fb.mc,
                Ec: M.Fb.Ec,
                rc: M.Fb.rc,
                pc: M.Fb.pc,
                Dc: M.Fb.Dc,
                qc: M.Fb.qc
              }, stream: { bc: M.Pb.bc }
            },
            file: {
              node: { Wb: M.Fb.Wb, Tb: M.Fb.Tb },
              stream: { bc: M.Pb.bc, read: M.Pb.read, write: M.Pb.write, xc: M.Pb.xc, nc: M.Pb.nc, oc: M.Pb.oc }
            },
            link: { node: { Wb: M.Fb.Wb, Tb: M.Fb.Tb, jc: M.Fb.jc }, stream: {} },
            yc: { node: { Wb: M.Fb.Wb, Tb: M.Fb.Tb }, stream: Si }
          }), r = Yn(e, t, r, i), ke(r.mode) ? (r.Fb = M.Yb.dir.node, r.Pb = M.Yb.dir.stream, r.Qb = {}) : (r.mode & 61440) === 32768 ? (r.Fb = M.Yb.file.node, r.Pb = M.Yb.file.stream, r.Sb = 0, r.Qb = null) : (r.mode & 61440) === 40960 ? (r.Fb = M.Yb.link.node, r.Pb = M.Yb.link.stream) : (r.mode & 61440) === 8192 && (r.Fb = M.Yb.yc.node, r.Pb = M.Yb.yc.stream), r.timestamp = Date.now(), e && (e.Qb[t] = r, e.timestamp = r.timestamp), r;
        }, $c(e) {
          return e.Qb ? e.Qb.subarray ? e.Qb.subarray(0, e.Sb) : new Uint8Array(e.Qb) : new Uint8Array(0);
        }, Fb: {
          Wb(e) {
            var t = {};
            return t.Kc = (e.mode & 61440) === 8192 ? e.id : 1, t.Bc = e.id, t.mode = e.mode, t.Qc = 1, t.uid = 0, t.Nc = 0, t.ic = e.ic, ke(e.mode) ? t.size = 4096 : (e.mode & 61440) === 32768 ? t.size = e.Sb : (e.mode & 61440) === 40960 ? t.size = e.link.length : t.size = 0, t.Gc = new Date(e.timestamp), t.Pc = new Date(e.timestamp), t.Jc = new Date(e.timestamp), t.Hc = 4096, t.Ic = Math.ceil(t.size / t.Hc), t;
          }, Tb(e, t) {
            if (t.mode !== void 0 && (e.mode = t.mode), t.timestamp !== void 0 && (e.timestamp = t.timestamp), t.size !== void 0 && (t = t.size, e.Sb != t)) if (t == 0) e.Qb = null, e.Sb = 0; else {
              var r = e.Qb;
              e.Qb = new Uint8Array(t), r && e.Qb.set(r.subarray(0, Math.min(t, e.Sb))), e.Sb = t;
            }
          }, fc() {
            throw un[44];
          }, mc(e, t, r, i) {
            return M.createNode(e, t, r, i);
          }, Ec(e, t, r) {
            if (ke(e.mode)) {
              try {
                var i = rt(t, r);
              } catch {
              }
              if (i) for (var o in i.Qb) throw new S(55);
            }
            delete e.parent.Qb[e.name], e.parent.timestamp = Date.now(), e.name = r, t.Qb[r] = e, t.timestamp = e.parent.timestamp, e.parent = t;
          }, rc(e, t) {
            delete e.Qb[t], e.timestamp = Date.now();
          }, pc(e, t) {
            var r = rt(e, t), i;
            for (i in r.Qb) throw new S(55);
            delete e.Qb[t], e.timestamp = Date.now();
          }, Dc(e) {
            var t = [".", ".."], r;
            for (r in e.Qb) e.Qb.hasOwnProperty(r) && t.push(r);
            return t;
          }, qc(e, t, r) {
            return e = M.createNode(e, t, 41471, 0), e.link = r, e;
          }, jc(e) {
            if ((e.mode & 61440) !== 40960) throw new S(28);
            return e.link;
          }
        }, Pb: {
          read(e, t, r, i, o) {
            var g = e.node.Qb;
            if (o >= e.node.Sb) return 0;
            if (e = Math.min(e.node.Sb - o, i), 8 < e && g.subarray) t.set(g.subarray(o, o + e), r); else for (i = 0; i < e; i++) t[r + i] = g[o + i];
            return e;
          }, write(e, t, r, i, o, g) {
            if (t.buffer === y.buffer && (g = !1), !i) return 0;
            if (e = e.node, e.timestamp = Date.now(), t.subarray && (!e.Qb || e.Qb.subarray)) {
              if (g) return e.Qb = t.subarray(r, r + i), e.Sb = i;
              if (e.Sb === 0 && o === 0) return e.Qb = t.slice(r, r + i), e.Sb = i;
              if (o + i <= e.Sb) return e.Qb.set(t.subarray(r, r + i), o), i;
            }
            if (jn(e, o + i), e.Qb.subarray && t.subarray) e.Qb.set(t.subarray(r, r + i), o); else for (g = 0; g < i; g++) e.Qb[o + g] = t[r + g];
            return e.Sb = Math.max(e.Sb, o + i), i;
          }, bc(e, t, r) {
            if (r === 1 ? t += e.position : r === 2 && (e.node.mode & 61440) === 32768 && (t += e.node.Sb), 0 > t) throw new S(28);
            return t;
          }, xc(e, t, r) {
            jn(e.node, t + r), e.node.Sb = Math.max(e.node.Sb, t + r);
          }, nc(e, t, r, i, o) {
            if ((e.node.mode & 61440) !== 32768) throw new S(43);
            if (e = e.node.Qb, o & 2 || e.buffer !== y.buffer) {
              if ((0 < r || r + t < e.length) && (e.subarray ? e = e.subarray(r, r + t) : e = Array.prototype.slice.call(e, r, r + t)), r = !0, t = 65536 * Math.ceil(t / 65536), (o = us(65536, t)) ? (E.fill(0, o, o + t), t = o) : t = 0, !t) throw new S(48);
              y.set(e, t);
            } else r = !1, t = e.byteOffset;
            return { Rc: t, Fc: r };
          }, oc(e, t, r, i) {
            return M.Pb.write(e, t, 0, i, r, !1), 0;
          }
        }
      }, xi = (e, t) => {
        var r = 0;
        return e && (r |= 365), t && (r |= 146), r;
      }, cn = null, Hn = {}, vt = [], vi = 1, Ve = null, Kn = !0, S = null, un = {};

      function Ee(e, t = {}) {
        if (e = Vt(e), !e) return { path: "", node: null };
        if (t = Object.assign({ zc: !0, vc: 0 }, t), 8 < t.vc) throw new S(32);
        e = e.split("/").filter(d => !!d);
        for (var r = cn, i = "/", o = 0; o < e.length; o++) {
          var g = o === e.length - 1;
          if (g && t.parent) break;
          if (r = rt(r, e[o]), i = Me(i + "/" + e[o]), r.cc && (!g || g && t.zc) && (r = r.cc.root), !g || t.ac) {
            for (g = 0; (r.mode & 61440) === 40960;) if (r = rr(i), i = Vt(wi(i), r), r = Ee(i, { vc: t.vc + 1 }).node, 40 < g++) throw new S(32);
          }
        }
        return { path: i, node: r };
      }

      function Wt(e) {
        for (var t; ;) {
          if (e === e.parent) return e = e.Xb.Cc, t ? e[e.length - 1] !== "/" ? `${e}/${t}` : e + t : e;
          t = t ? `${e.name}/${t}` : e.name, e = e.parent;
        }
      }

      function ln(e, t) {
        for (var r = 0, i = 0; i < t.length; i++) r = (r << 5) - r + t.charCodeAt(i) | 0;
        return (e + r >>> 0) % Ve.length;
      }

      function Xn(e) {
        var t = ln(e.parent.id, e.name);
        if (Ve[t] === e) Ve[t] = e.dc; else for (t = Ve[t]; t;) {
          if (t.dc === e) {
            t.dc = e.dc;
            break;
          }
          t = t.dc;
        }
      }

      function rt(e, t) {
        var r;
        if (r = (r = mt(e, "x")) ? r : e.Fb.fc ? 0 : 2) throw new S(r, e);
        for (r = Ve[ln(e.id, t)]; r; r = r.dc) {
          var i = r.name;
          if (r.parent.id === e.id && i === t) return r;
        }
        return e.Fb.fc(e, t);
      }

      function Yn(e, t, r, i) {
        return e = new is(e, t, r, i), t = ln(e.parent.id, e.name), e.dc = Ve[t], Ve[t] = e;
      }

      function ke(e) {
        return (e & 61440) === 16384;
      }

      function Zn(e) {
        var t = ["r", "w", "rw"][e & 3];
        return e & 512 && (t += "w"), t;
      }

      function mt(e, t) {
        if (Kn) return 0;
        if (!t.includes("r") || e.mode & 292) {
          if (t.includes("w") && !(e.mode & 146) || t.includes("x") && !(e.mode & 73)) return 2;
        } else return 2;
        return 0;
      }

      function Gn(e, t) {
        try {
          return rt(e, t), 20;
        } catch {
        }
        return mt(e, "wx");
      }

      function Jn(e, t, r) {
        try {
          var i = rt(e, t);
        } catch (o) {
          return o.Rb;
        }
        if (e = mt(e, "wx")) return e;
        if (r) {
          if (!ke(i.mode)) return 54;
          if (i === i.parent || Wt(i) === "/") return 10;
        } else if (ke(i.mode)) return 31;
        return 0;
      }

      function Ei() {
        for (var e = 0; 4096 >= e; e++) if (!vt[e]) return e;
        throw new S(33);
      }

      function Ae(e) {
        if (e = vt[e], !e) throw new S(8);
        return e;
      }

      function er(e, t = -1) {
        return St || (St = function() {
          this.kc = {};
        }, St.prototype = {}, Object.defineProperties(St.prototype, {
          object: {
            get() {
              return this.node;
            }, set(r) {
              this.node = r;
            }
          }, flags: {
            get() {
              return this.kc.flags;
            }, set(r) {
              this.kc.flags = r;
            }
          }, position: {
            get() {
              return this.kc.position;
            }, set(r) {
              this.kc.position = r;
            }
          }
        })), e = Object.assign(new St, e), t == -1 && (t = Ei()), e.Zb = t, vt[t] = e;
      }

      var Si = {
        open(e) {
          e.Pb = Hn[e.node.ic].Pb, e.Pb.open && e.Pb.open(e);
        }, bc() {
          throw new S(70);
        }
      };

      function fn(e, t) {
        Hn[e] = { Pb: t };
      }

      function tr(e, t) {
        var r = t === "/", i = !t;
        if (r && cn) throw new S(10);
        if (!r && !i) {
          var o = Ee(t, { zc: !1 });
          if (t = o.path, o = o.node, o.cc) throw new S(10);
          if (!ke(o.mode)) throw new S(54);
        }
        t = {
          type: e,
          ed: {},
          Cc: t,
          Oc: []
        }, e = e.Xb(t), e.Xb = t, t.root = e, r ? cn = e : o && (o.cc = t, o.Xb && o.Xb.Oc.push(t));
      }

      function hn(e, t, r) {
        var i = Ee(e, { parent: !0 }).node;
        if (e = Mt(e), !e || e === "." || e === "..") throw new S(28);
        var o = Gn(i, e);
        if (o) throw new S(o);
        if (!i.Fb.mc) throw new S(63);
        return i.Fb.mc(i, e, t, r);
      }

      function Oe(e, t) {
        return hn(e, (t !== void 0 ? t : 511) & 1023 | 16384, 0);
      }

      function jt(e, t, r) {
        typeof r > "u" && (r = t, t = 438), hn(e, t | 8192, r);
      }

      function mn(e, t) {
        if (!Vt(e)) throw new S(44);
        var r = Ee(t, { parent: !0 }).node;
        if (!r) throw new S(44);
        t = Mt(t);
        var i = Gn(r, t);
        if (i) throw new S(i);
        if (!r.Fb.qc) throw new S(63);
        r.Fb.qc(r, t, e);
      }

      function nr(e) {
        var t = Ee(e, { parent: !0 }).node;
        e = Mt(e);
        var r = rt(t, e), i = Jn(t, e, !0);
        if (i) throw new S(i);
        if (!t.Fb.pc) throw new S(63);
        if (r.cc) throw new S(10);
        t.Fb.pc(t, e), Xn(r);
      }

      function rr(e) {
        if (e = Ee(e).node, !e) throw new S(44);
        if (!e.Fb.jc) throw new S(28);
        return Vt(Wt(e.parent), e.Fb.jc(e));
      }

      function Ht(e, t) {
        if (e = Ee(e, { ac: !t }).node, !e) throw new S(44);
        if (!e.Fb.Wb) throw new S(63);
        return e.Fb.Wb(e);
      }

      function sr(e) {
        return Ht(e, !0);
      }

      function ir(e, t) {
        if (e = typeof e == "string" ? Ee(e, { ac: !0 }).node : e, !e.Fb.Tb) throw new S(63);
        e.Fb.Tb(e, { mode: t & 4095 | e.mode & -4096, timestamp: Date.now() });
      }

      function or(e, t) {
        if (0 > t) throw new S(28);
        if (e = typeof e == "string" ? Ee(e, { ac: !0 }).node : e, !e.Fb.Tb) throw new S(63);
        if (ke(e.mode)) throw new S(31);
        if ((e.mode & 61440) !== 32768) throw new S(28);
        var r = mt(e, "w");
        if (r) throw new S(r);
        e.Fb.Tb(e, { size: t, timestamp: Date.now() });
      }

      function Kt(e, t, r) {
        if (e === "") throw new S(44);
        if (typeof t == "string") {
          var i = { r: 0, "r+": 2, w: 577, "w+": 578, a: 1089, "a+": 1090 }[t];
          if (typeof i > "u") throw Error(`Unknown file open mode: ${t}`);
          t = i;
        }
        if (r = t & 64 ? (typeof r > "u" ? 438 : r) & 4095 | 32768 : 0, typeof e == "object") var o = e; else {
          e = Me(e);
          try {
            o = Ee(e, { ac: !(t & 131072) }).node;
          } catch {
          }
        }
        if (i = !1, t & 64) if (o) {
          if (t & 128) throw new S(20);
        } else o = hn(e, r, 0), i = !0;
        if (!o) throw new S(44);
        if ((o.mode & 61440) === 8192 && (t &= -513), t & 65536 && !ke(o.mode)) throw new S(54);
        if (!i && (r = o ? (o.mode & 61440) === 40960 ? 32 : ke(o.mode) && (Zn(t) !== "r" || t & 512) ? 31 : mt(o, Zn(t)) : 44)) throw new S(r);
        return t & 512 && !i && or(o, 0), t &= -131713, o = er({
          node: o,
          path: Wt(o),
          flags: t,
          seekable: !0,
          position: 0,
          Pb: o.Pb,
          Uc: [],
          error: !1
        }), o.Pb.open && o.Pb.open(o), !n.logReadFiles || t & 1 || (Xt || (Xt = {}), e in Xt || (Xt[e] = 1)), o;
      }

      function ar(e, t, r) {
        if (e.Zb === null) throw new S(8);
        if (!e.seekable || !e.Pb.bc) throw new S(70);
        if (r != 0 && r != 1 && r != 2) throw new S(28);
        e.position = e.Pb.bc(e, t, r), e.Uc = [];
      }

      function cr() {
        S || (S = function(e, t) {
          this.name = "ErrnoError", this.node = t, this.Sc = function(r) {
            this.Rb = r;
          }, this.Sc(e), this.message = "FS error";
        }, S.prototype = Error(), S.prototype.constructor = S, [44].forEach(e => {
          un[e] = new S(e), un[e].stack = "<generic error, no stack>";
        }));
      }

      var ur;

      function Et(e, t, r) {
        e = Me("/dev/" + e);
        var i = xi(!!t, !!r);
        dn || (dn = 64);
        var o = dn++ << 8 | 0;
        fn(o, {
          open(g) {
            g.seekable = !1;
          }, close() {
            r && r.buffer && r.buffer.length && r(10);
          }, read(g, d, v, w) {
            for (var p = 0, R = 0; R < w; R++) {
              try {
                var x = t();
              } catch {
                throw new S(29);
              }
              if (x === void 0 && p === 0) throw new S(6);
              if (x == null) break;
              p++, d[v + R] = x;
            }
            return p && (g.node.timestamp = Date.now()), p;
          }, write(g, d, v, w) {
            for (var p = 0; p < w; p++) try {
              r(d[v + p]);
            } catch {
              throw new S(29);
            }
            return w && (g.node.timestamp = Date.now()), p;
          }
        }), jt(e, i, o);
      }

      var dn, ee = {}, St, Xt;

      function st(e, t, r) {
        if (t.charAt(0) === "/") return t;
        if (e = e === -100 ? "/" : Ae(e).path, t.length == 0) {
          if (!r) throw new S(44);
          return e;
        }
        return Me(e + "/" + t);
      }

      function Yt(e, t, r) {
        try {
          var i = e(t);
        } catch (g) {
          if (g && g.node && Me(t) !== Me(Wt(g.node))) return -54;
          throw g;
        }
        C[r >> 2] = i.Kc, C[r + 4 >> 2] = i.mode, Q[r + 8 >> 2] = i.Qc, C[r + 12 >> 2] = i.uid, C[r + 16 >> 2] = i.Nc, C[r + 20 >> 2] = i.ic, se = [i.size >>> 0, (U = i.size, 1 <= +Math.abs(U) ? 0 < U ? +Math.floor(U / 4294967296) >>> 0 : ~~+Math.ceil((U - +(~~U >>> 0)) / 4294967296) >>> 0 : 0)], C[r + 24 >> 2] = se[0], C[r + 28 >> 2] = se[1], C[r + 32 >> 2] = 4096, C[r + 36 >> 2] = i.Ic, e = i.Gc.getTime(), t = i.Pc.getTime();
        var o = i.Jc.getTime();
        return se = [Math.floor(e / 1e3) >>> 0, (U = Math.floor(e / 1e3), 1 <= +Math.abs(U) ? 0 < U ? +Math.floor(U / 4294967296) >>> 0 : ~~+Math.ceil((U - +(~~U >>> 0)) / 4294967296) >>> 0 : 0)], C[r + 40 >> 2] = se[0], C[r + 44 >> 2] = se[1], Q[r + 48 >> 2] = e % 1e3 * 1e3, se = [Math.floor(t / 1e3) >>> 0, (U = Math.floor(t / 1e3), 1 <= +Math.abs(U) ? 0 < U ? +Math.floor(U / 4294967296) >>> 0 : ~~+Math.ceil((U - +(~~U >>> 0)) / 4294967296) >>> 0 : 0)], C[r + 56 >> 2] = se[0], C[r + 60 >> 2] = se[1], Q[r + 64 >> 2] = t % 1e3 * 1e3, se = [Math.floor(o / 1e3) >>> 0, (U = Math.floor(o / 1e3), 1 <= +Math.abs(U) ? 0 < U ? +Math.floor(U / 4294967296) >>> 0 : ~~+Math.ceil((U - +(~~U >>> 0)) / 4294967296) >>> 0 : 0)], C[r + 72 >> 2] = se[0], C[r + 76 >> 2] = se[1], Q[r + 80 >> 2] = o % 1e3 * 1e3, se = [i.Bc >>> 0, (U = i.Bc, 1 <= +Math.abs(U) ? 0 < U ? +Math.floor(U / 4294967296) >>> 0 : ~~+Math.ceil((U - +(~~U >>> 0)) / 4294967296) >>> 0 : 0)], C[r + 88 >> 2] = se[0], C[r + 92 >> 2] = se[1], 0;
      }

      var Zt = void 0;

      function Gt() {
        var e = C[Zt >> 2];
        return Zt += 4, e;
      }

      var Rt = (e, t) => t + 2097152 >>> 0 < 4194305 - !!e ? (e >>> 0) + 4294967296 * t : NaN,
        Ri = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335],
        Ti = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], lr = e => {
          var t = tt(e) + 1, r = bn(t);
          return r && nt(e, E, r, t), r;
        }, gn = {}, fr = () => {
          if (!_n) {
            var e = {
              USER: "web_user",
              LOGNAME: "web_user",
              PATH: "/",
              PWD: "/",
              HOME: "/home/web_user",
              LANG: (typeof navigator == "object" && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8",
              _: A || "./this.program"
            }, t;
            for (t in gn) gn[t] === void 0 ? delete e[t] : e[t] = gn[t];
            var r = [];
            for (t in e) r.push(`${t}=${e[t]}`);
            _n = r;
          }
          return _n;
        }, _n;

      function hr() {
      }

      function mr() {
      }

      function dr() {
      }

      function gr() {
      }

      function _r() {
      }

      function wr() {
      }

      function pr() {
      }

      function br() {
      }

      function yr() {
      }

      function Ar() {
      }

      function xr() {
      }

      function vr() {
      }

      function Er() {
      }

      function Sr() {
      }

      function Rr() {
      }

      function Tr() {
      }

      function qr() {
      }

      function kr() {
      }

      function Ir() {
      }

      function Cr() {
      }

      function Lr() {
      }

      function Pr() {
      }

      function Fr() {
      }

      function Or() {
      }

      function Dr() {
      }

      function Nr() {
      }

      function Ur() {
      }

      function $r() {
      }

      function Br() {
      }

      function zr() {
      }

      function Qr() {
      }

      function Mr() {
      }

      function Vr() {
      }

      function Wr() {
      }

      function jr() {
      }

      function Hr() {
      }

      function Kr() {
      }

      function Xr() {
      }

      function Yr() {
      }

      function Zr() {
      }

      var Gr = e => {
        _ = e, l || 0 < B || (n.onExit && n.onExit(e), a = !0), q(e, new Bn(e));
      }, wn = e => {
        e instanceof Bn || e == "unwind" || q(1, e);
      }, Jt = e => {
        try {
          e();
        } catch (t) {
          he(t);
        }
      };

      function qi(e) {
        var t = {}, r;
        for (r in e) (function(i) {
          var o = e[i];
          t[i] = typeof o == "function" ? function() {
            en.push(i);
            try {
              return o.apply(null, arguments);
            } finally {
              a || (en.pop() === i || he(), De && We === 1 && en.length === 0 && (We = 0, Jt(ds), typeof Fibers < "u" && Fibers.fd()));
            }
          } : o;
        })(r);
        return t;
      }

      var We = 0, De = null, Jr = 0, en = [], es = {}, ts = {}, ki = 0, pn = null, Ii = [];

      function Ci() {
        return new Promise((e, t) => {
          pn = { resolve: e, reject: t };
        });
      }

      function Li() {
        var e = bn(16396), t = e + 12;
        Q[e >> 2] = t, Q[e + 4 >> 2] = t + 16384, t = en[0];
        var r = es[t];
        return r === void 0 && (r = ki++, es[t] = r, ts[r] = t), C[e + 8 >> 2] = r, e;
      }

      function ns(e) {
        if (!a) {
          if (We === 0) {
            var t = !1, r = !1;
            e((i = 0) => {
              if (!a && (Jr = i, t = !0, r)) {
                We = 2, Jt(() => gs(De)), typeof Browser < "u" && Browser.tc.Mc && Browser.tc.resume(), i = !1;
                try {
                  var o = (0, k[ts[C[De + 8 >> 2]]])();
                } catch (v) {
                  o = v, i = !0;
                }
                var g = !1;
                if (!De) {
                  var d = pn;
                  d && (pn = null, (i ? d.reject : d.resolve)(o), g = !0);
                }
                if (i && !g) throw o;
              }
            }), r = !0, t || (We = 1, De = Li(), typeof Browser < "u" && Browser.tc.Mc && Browser.tc.pause(), Jt(() => ms(De)));
          } else We === 2 ? (We = 0, Jt(_s), as(De), De = null, Ii.forEach(i => {
            if (!a) try {
              if (i(), !(l || 0 < B)) try {
                _ = i = _, Gr(i);
              } catch (o) {
                wn(o);
              }
            } catch (o) {
              wn(o);
            }
          })) : he(`invalid state: ${We}`);
          return Jr;
        }
      }

      function rs(e) {
        return ns(t => {
          e().then(t);
        });
      }

      var ss = {}, Le = (e, t, r, i, o) => {
        function g(x) {
          return --B, w !== 0 && hs(w), t === "string" ? x ? H(E, x) : "" : t === "boolean" ? !!x : x;
        }

        var d = {
          string: x => {
            var T = 0;
            if (x != null && x !== 0) {
              T = tt(x) + 1;
              var z = yn(T);
              nt(x, E, z, T), T = z;
            }
            return T;
          }, array: x => {
            var T = yn(x.length);
            return y.set(x, T), T;
          }
        };
        e = n["_" + e];
        var v = [], w = 0;
        if (i) for (var p = 0; p < i.length; p++) {
          var R = d[r[p]];
          R ? (w === 0 && (w = fs()), v[p] = R(i[p])) : v[p] = i[p];
        }
        return r = De, i = e.apply(null, v), o = o && o.async, B += 1, De != r ? Ci().then(g) : (i = g(i), o ? Promise.resolve(i) : i);
      };

      function is(e, t, r, i) {
        e || (e = this), this.parent = e, this.Xb = e.Xb, this.cc = null, this.id = vi++, this.name = t, this.mode = r, this.Fb = {}, this.Pb = {}, this.ic = i;
      }

      Object.defineProperties(is.prototype, {
        read: {
          get: function() {
            return (this.mode & 365) === 365;
          }, set: function(e) {
            e ? this.mode |= 365 : this.mode &= -366;
          }
        }, write: {
          get: function() {
            return (this.mode & 146) === 146;
          }, set: function(e) {
            e ? this.mode |= 146 : this.mode &= -147;
          }
        }
      }), cr(), Ve = Array(4096), tr(M, "/"), Oe("/tmp"), Oe("/home"), Oe("/home/web_user"), function() {
        Oe("/dev"), fn(259, {
          read: () => 0,
          write: (i, o, g, d) => d
        }), jt("/dev/null", 259), Wn(1280, yi), Wn(1536, Ai), jt("/dev/tty", 1280), jt("/dev/tty1", 1536);
        var e = new Uint8Array(1024), t = 0, r = () => (t === 0 && (t = Mn(e).byteLength), e[--t]);
        Et("random", r), Et("urandom", r), Oe("/dev/shm"), Oe("/dev/shm/tmp");
      }(), function() {
        Oe("/proc");
        var e = Oe("/proc/self");
        Oe("/proc/self/fd"), tr({
          Xb() {
            var t = Yn(e, "fd", 16895, 73);
            return t.Fb = {
              fc(r, i) {
                var o = Ae(+i);
                return r = { parent: null, Xb: { Cc: "fake" }, Fb: { jc: () => o.path } }, r.parent = r;
              }
            }, t;
          }
        }, "/proc/self/fd");
      }(), function() {
        const e = new Map;
        n.setAuthorizer = function(t, r, i) {
          return r ? e.set(t, { f: r, wc: i }) : e.delete(t), Le("set_authorizer", "number", ["number"], [t]);
        }, hr = function(t, r, i, o, g, d) {
          if (e.has(t)) {
            const { f: v, wc: w } = e.get(t);
            return v(w, r, i ? i ? H(E, i) : "" : null, o ? o ? H(E, o) : "" : null, g ? g ? H(E, g) : "" : null, d ? d ? H(E, d) : "" : null);
          }
          return 0;
        };
      }(), function() {
        function e(i, o) {
          const g = [];
          for (let d = 0; i[o + d] != 0; ++d) {
            if (1e3 < d) throw Error("C-string never terminated after 1k characters");
            g.push(i[o + d]);
          }
          return String.fromCharCode(...g);
        }

        const t = new Map, r = new Map;
        n.updateHook = function(i, o) {
          const g = t.size;
          return t.set(g, o), Le("update_hook", "void", ["number", "number"], [i, g]);
        }, n.createFunction = function(i, o, g, d, v, w) {
          const p = t.size;
          return t.set(p, {
            f: w,
            $b: v
          }), Le("create_function", "number", "number string number number number number".split(" "), [i, o, g, d, p, 0]);
        }, n.createAggregate = function(i, o, g, d, v, w, p) {
          const R = t.size;
          return t.set(R, {
            step: w,
            Lc: p,
            $b: v
          }), Le("create_function", "number", "number string number number number number".split(" "), [i, o, g, d, R, 1]);
        }, n.getFunctionUserData = function(i) {
          return r.get(i);
        }, wr = function(i, o, g, d, v, w) {
          i = t.get(i);
          const p = E;
          v = BigInt(w) << 32n | BigInt(v) & 4294967295n, i(o, e(p, g), e(p, d), v);
        }, dr = function(i, o, g, d) {
          i = t.get(i), r.set(o, i.$b), i.f(o, new Uint32Array(E.buffer, d, g)), r.delete(o);
        }, _r = function(i, o, g, d) {
          i = t.get(i), r.set(o, i.$b), i.step(o, new Uint32Array(E.buffer, d, g)), r.delete(o);
        }, mr = function(i, o) {
          i = t.get(i), r.set(o, i.$b), i.Lc(o), r.delete(o);
        };
      }(), function() {
        const e = new Map;
        n.progressHandler = function(t, r, i, o) {
          return i ? e.set(t, {
            f: i,
            wc: o
          }) : e.delete(t), Le("progress_handler", null, ["number", "number"], [t, r]);
        }, gr = function(t) {
          if (e.has(t)) {
            const { f: r, wc: i } = e.get(t);
            return r(i);
          }
          return 0;
        };
      }(), function() {
        function e(w, p) {
          const R = `get${w}`, x = `set${w}`;
          return new Proxy(new DataView(E.buffer, p, w === "Int32" ? 4 : 8), {
            get(T, z) {
              if (z === R) return function(Y, de) {
                if (!de) throw Error("must be little endian");
                return T[z](Y, de);
              };
              if (z === x) return function(Y, de, ue) {
                if (!ue) throw Error("must be little endian");
                return T[z](Y, de, ue);
              };
              if (typeof z == "string" && z.match(/^(get)|(set)/)) throw Error("invalid type");
              return T[z];
            }
          });
        }

        const t = typeof ss == "object", r = new Map, i = new Map, o = new Map, g = t ? new Set : null,
          d = t ? new Set : null, v = new Map;
        Fr = function(w, p, R, x) {
          v.set(w ? H(E, w) : "", { size: p, hc: Array.from(new Uint32Array(E.buffer, x, R)) });
        }, n.createModule = function(w, p, R, x) {
          t && (R.handleAsync = rs);
          const T = r.size;
          return r.set(T, {
            module: R,
            $b: x
          }), x = 0, R.xCreate && (x |= 1), R.xConnect && (x |= 2), R.xBestIndex && (x |= 4), R.xDisconnect && (x |= 8), R.xDestroy && (x |= 16), R.xOpen && (x |= 32), R.xClose && (x |= 64), R.xFilter && (x |= 128), R.xNext && (x |= 256), R.xEof && (x |= 512), R.xColumn && (x |= 1024), R.xRowid && (x |= 2048), R.xUpdate && (x |= 4096), R.xBegin && (x |= 8192), R.xSync && (x |= 16384), R.xCommit && (x |= 32768), R.xRollback && (x |= 65536), R.xFindFunction && (x |= 131072), R.xRename && (x |= 262144), Le("create_module", "number", ["number", "string", "number", "number"], [w, p, T, x]);
        }, Er = function(w, p, R, x, T, z) {
          if (p = r.get(p), i.set(T, p), t) {
            g.delete(T);
            for (const Y of g) i.delete(Y);
          }
          return x = Array.from(new Uint32Array(E.buffer, x, R)).map(Y => Y ? H(E, Y) : ""), p.module.xCreate(w, p.$b, x, T, e("Int32", z));
        }, vr = function(w, p, R, x, T, z) {
          if (p = r.get(p), i.set(T, p), t) {
            g.delete(T);
            for (const Y of g) i.delete(Y);
          }
          return x = Array.from(new Uint32Array(E.buffer, x, R)).map(Y => Y ? H(E, Y) : ""), p.module.xConnect(w, p.$b, x, T, e("Int32", z));
        }, br = function(w, p) {
          var R = i.get(w), x = v.get("sqlite3_index_info").hc;
          const T = {};
          T.nConstraint = me(p + x[0], "i32"), T.aConstraint = [];
          for (var z = me(p + x[1], "*"), Y = v.get("sqlite3_index_constraint").size, de = 0; de < T.nConstraint; ++de) {
            var ue = T.aConstraint, Se = ue.push, we = z + de * Y, dt = v.get("sqlite3_index_constraint").hc, je = {};
            je.iColumn = me(we + dt[0], "i32"), je.op = me(we + dt[1], "i8"), je.usable = !!me(we + dt[2], "i8"), Se.call(ue, je);
          }
          for (T.nOrderBy = me(p + x[2], "i32"), T.aOrderBy = [], z = me(p + x[3], "*"), Y = v.get("sqlite3_index_orderby").size, de = 0; de < T.nOrderBy; ++de) ue = T.aOrderBy, Se = ue.push, we = z + de * Y, dt = v.get("sqlite3_index_orderby").hc, je = {}, je.iColumn = me(we + dt[0], "i32"), je.desc = !!me(we + dt[1], "i8"), Se.call(ue, je);
          for (T.aConstraintUsage = [], z = 0; z < T.nConstraint; ++z) T.aConstraintUsage.push({
            argvIndex: 0,
            omit: !1
          });
          for (T.idxNum = me(p + x[5], "i32"), T.idxStr = null, T.orderByConsumed = !!me(p + x[8], "i8"), T.estimatedCost = me(p + x[9], "double"), T.estimatedRows = me(p + x[10], "i32"), T.idxFlags = me(p + x[11], "i32"), T.colUsed = me(p + x[12], "i32"), w = R.module.xBestIndex(w, T), R = v.get("sqlite3_index_info").hc, x = me(p + R[4], "*"), z = v.get("sqlite3_index_constraint_usage").size, Se = 0; Se < T.nConstraint; ++Se) Y = x + Se * z, ue = T.aConstraintUsage[Se], we = v.get("sqlite3_index_constraint_usage").hc, Fe(Y + we[0], ue.argvIndex, "i32"), Fe(Y + we[1], ue.omit ? 1 : 0, "i8");
          return Fe(p + R[5], T.idxNum, "i32"), typeof T.idxStr == "string" && (x = tt(T.idxStr), z = Le("sqlite3_malloc", "number", ["number"], [x + 1]), nt(T.idxStr, E, z, x + 1), Fe(p + R[6], z, "*"), Fe(p + R[7], 1, "i32")), Fe(p + R[8], T.orderByConsumed, "i32"), Fe(p + R[9], T.estimatedCost, "double"), Fe(p + R[10], T.estimatedRows, "i32"), Fe(p + R[11], T.idxFlags, "i32"), w;
        }, Rr = function(w) {
          const p = i.get(w);
          return t ? g.add(w) : i.delete(w), p.module.xDisconnect(w);
        }, Sr = function(w) {
          const p = i.get(w);
          return t ? g.add(w) : i.delete(w), p.module.xDestroy(w);
        }, Ir = function(w, p) {
          const R = i.get(w);
          if (o.set(p, R), t) {
            d.delete(p);
            for (const x of d) o.delete(x);
          }
          return R.module.xOpen(w, p);
        }, yr = function(w) {
          const p = o.get(w);
          return t ? d.add(w) : o.delete(w), p.module.xClose(w);
        }, Tr = function(w) {
          return o.get(w).module.xEof(w) ? 1 : 0;
        }, qr = function(w, p, R, x, T) {
          const z = o.get(w);
          return R = R ? R ? H(E, R) : "" : null, T = new Uint32Array(E.buffer, T, x), z.module.xFilter(w, p, R, T);
        }, kr = function(w) {
          return o.get(w).module.xNext(w);
        }, Ar = function(w, p, R) {
          return o.get(w).module.xColumn(w, p, R);
        }, Pr = function(w, p) {
          return o.get(w).module.xRowid(w, e("BigInt64", p));
        }, Dr = function(w, p, R, x) {
          const T = i.get(w);
          return R = new Uint32Array(E.buffer, R, p), T.module.xUpdate(w, R, e("BigInt64", x));
        }, pr = function(w) {
          return i.get(w).module.xBegin(w);
        }, Or = function(w) {
          return i.get(w).module.xSync(w);
        }, xr = function(w) {
          return i.get(w).module.xCommit(w);
        }, Lr = function(w) {
          return i.get(w).module.xRollback(w);
        }, Cr = function(w, p) {
          const R = i.get(w);
          return p = p ? H(E, p) : "", R.module.xRename(w, p);
        };
      }(), function() {
        function e(d, v) {
          const w = `get${d}`, p = `set${d}`;
          return new Proxy(new DataView(E.buffer, v, d === "Int32" ? 4 : 8), {
            get(R, x) {
              if (x === w) return function(T, z) {
                if (!z) throw Error("must be little endian");
                return R[x](T, z);
              };
              if (x === p) return function(T, z, Y) {
                if (!Y) throw Error("must be little endian");
                return R[x](T, z, Y);
              };
              if (typeof x == "string" && x.match(/^(get)|(set)/)) throw Error("invalid type");
              return R[x];
            }
          });
        }

        function t(d) {
          return d >>= 2, Q[d] + Q[d + 1] * 2 ** 32;
        }

        const r = typeof ss == "object", i = new Map, o = new Map;
        n.registerVFS = function(d, v) {
          if (Le("sqlite3_vfs_find", "number", ["string"], [d.name])) throw Error(`VFS '${d.name}' already registered`);
          r && (d.handleAsync = rs);
          var w = d.dd ?? 64;
          const p = n._malloc(4);
          return v = Le("register_vfs", "number", ["string", "number", "number", "number"], [d.name, w, v ? 1 : 0, p]), v || (w = me(p, "*"), i.set(w, d)), n._free(p), v;
        };
        const g = r ? new Set : null;
        $r = function(d) {
          const v = o.get(d);
          return r ? g.add(d) : o.delete(d), v.xClose(d);
        }, jr = function(d, v, w, p) {
          return o.get(d).xRead(d, E.subarray(v, v + w), t(p));
        }, Zr = function(d, v, w, p) {
          return o.get(d).xWrite(d, E.subarray(v, v + w), t(p));
        }, Xr = function(d, v) {
          return o.get(d).xTruncate(d, t(v));
        }, Kr = function(d, v) {
          return o.get(d).xSync(d, v);
        }, Mr = function(d, v) {
          const w = o.get(d);
          return v = e("BigInt64", v), w.xFileSize(d, v);
        }, Vr = function(d, v) {
          return o.get(d).xLock(d, v);
        }, Yr = function(d, v) {
          return o.get(d).xUnlock(d, v);
        }, Ur = function(d, v) {
          const w = o.get(d);
          return v = e("Int32", v), w.xCheckReservedLock(d, v);
        }, Qr = function(d, v, w) {
          const p = o.get(d);
          return w = new DataView(E.buffer, w), p.xFileControl(d, v, w);
        }, Hr = function(d) {
          return o.get(d).xSectorSize(d);
        }, zr = function(d) {
          return o.get(d).xDeviceCharacteristics(d);
        }, Wr = function(d, v, w, p, R) {
          if (d = i.get(d), o.set(w, d), r) {
            g.delete(w);
            for (var x of g) o.delete(x);
          }
          if (x = null, p & 64) {
            x = 1;
            const T = [];
            for (; x;) {
              const z = E[v++];
              if (z) T.push(z); else switch (E[v] || (x = null), x) {
                case 1:
                  T.push(63), x = 2;
                  break;
                case 2:
                  T.push(61), x = 3;
                  break;
                case 3:
                  T.push(38), x = 2;
              }
            }
            x = new TextDecoder().decode(new Uint8Array(T));
          } else v && (x = v ? H(E, v) : "");
          return R = e("Int32", R), d.xOpen(x, w, p, R);
        }, Br = function(d, v, w) {
          return i.get(d).xDelete(v ? H(E, v) : "", w);
        }, Nr = function(d, v, w, p) {
          return d = i.get(d), p = e("Int32", p), d.xAccess(v ? H(E, v) : "", w, p);
        };
      }();
      var Pi = {
        a: (e, t, r, i) => {
          he(`Assertion failed: ${e ? H(E, e) : ""}, at: ` + [t ? t ? H(E, t) : "" : "unknown filename", r, i ? i ? H(E, i) : "" : "unknown function"]);
        },
        L: function(e, t) {
          try {
            return e = e ? H(E, e) : "", ir(e, t), 0;
          } catch (r) {
            if (typeof ee > "u" || r.name !== "ErrnoError") throw r;
            return -r.Rb;
          }
        },
        N: function(e, t, r) {
          try {
            if (t = t ? H(E, t) : "", t = st(e, t), r & -8) return -28;
            var i = Ee(t, { ac: !0 }).node;
            return i ? (e = "", r & 4 && (e += "r"), r & 2 && (e += "w"), r & 1 && (e += "x"), e && mt(i, e) ? -2 : 0) : -44;
          } catch (o) {
            if (typeof ee > "u" || o.name !== "ErrnoError") throw o;
            return -o.Rb;
          }
        },
        M: function(e, t) {
          try {
            var r = Ae(e);
            return ir(r.node, t), 0;
          } catch (i) {
            if (typeof ee > "u" || i.name !== "ErrnoError") throw i;
            return -i.Rb;
          }
        },
        K: function(e) {
          try {
            var t = Ae(e).node, r = typeof t == "string" ? Ee(t, { ac: !0 }).node : t;
            if (!r.Fb.Tb) throw new S(63);
            return r.Fb.Tb(r, { timestamp: Date.now() }), 0;
          } catch (i) {
            if (typeof ee > "u" || i.name !== "ErrnoError") throw i;
            return -i.Rb;
          }
        },
        b: function(e, t, r) {
          Zt = r;
          try {
            var i = Ae(e);
            switch (t) {
              case 0:
                var o = Gt();
                if (0 > o) return -28;
                for (; vt[o];) o++;
                return er(i, o).Zb;
              case 1:
              case 2:
                return 0;
              case 3:
                return i.flags;
              case 4:
                return o = Gt(), i.flags |= o, 0;
              case 5:
                return o = Gt(), K[o + 0 >> 1] = 2, 0;
              case 6:
              case 7:
                return 0;
              case 16:
              case 8:
                return -28;
              case 9:
                return C[os() >> 2] = 28, -1;
              default:
                return -28;
            }
          } catch (g) {
            if (typeof ee > "u" || g.name !== "ErrnoError") throw g;
            return -g.Rb;
          }
        },
        J: function(e, t) {
          try {
            var r = Ae(e);
            return Yt(Ht, r.path, t);
          } catch (i) {
            if (typeof ee > "u" || i.name !== "ErrnoError") throw i;
            return -i.Rb;
          }
        },
        n: function(e, t, r) {
          t = Rt(t, r);
          try {
            if (isNaN(t)) return 61;
            var i = Ae(e);
            if (!(i.flags & 2097155)) throw new S(28);
            return or(i.node, t), 0;
          } catch (o) {
            if (typeof ee > "u" || o.name !== "ErrnoError") throw o;
            return -o.Rb;
          }
        },
        D: function(e, t) {
          try {
            if (t === 0) return -28;
            var r = tt("/") + 1;
            return t < r ? -68 : (nt("/", E, e, t), r);
          } catch (i) {
            if (typeof ee > "u" || i.name !== "ErrnoError") throw i;
            return -i.Rb;
          }
        },
        G: function(e, t) {
          try {
            return e = e ? H(E, e) : "", Yt(sr, e, t);
          } catch (r) {
            if (typeof ee > "u" || r.name !== "ErrnoError") throw r;
            return -r.Rb;
          }
        },
        A: function(e, t, r) {
          try {
            return t = t ? H(E, t) : "", t = st(e, t), t = Me(t), t[t.length - 1] === "/" && (t = t.substr(0, t.length - 1)), Oe(t, r), 0;
          } catch (i) {
            if (typeof ee > "u" || i.name !== "ErrnoError") throw i;
            return -i.Rb;
          }
        },
        F: function(e, t, r, i) {
          try {
            t = t ? H(E, t) : "";
            var o = i & 256;
            return t = st(e, t, i & 4096), Yt(o ? sr : Ht, t, r);
          } catch (g) {
            if (typeof ee > "u" || g.name !== "ErrnoError") throw g;
            return -g.Rb;
          }
        },
        z: function(e, t, r, i) {
          Zt = i;
          try {
            t = t ? H(E, t) : "", t = st(e, t);
            var o = i ? Gt() : 0;
            return Kt(t, r, o).Zb;
          } catch (g) {
            if (typeof ee > "u" || g.name !== "ErrnoError") throw g;
            return -g.Rb;
          }
        },
        w: function(e, t, r, i) {
          try {
            if (t = t ? H(E, t) : "", t = st(e, t), 0 >= i) return -28;
            var o = rr(t), g = Math.min(i, tt(o)), d = y[r + g];
            return nt(o, E, r, i + 1), y[r + g] = d, g;
          } catch (v) {
            if (typeof ee > "u" || v.name !== "ErrnoError") throw v;
            return -v.Rb;
          }
        },
        v: function(e) {
          try {
            return e = e ? H(E, e) : "", nr(e), 0;
          } catch (t) {
            if (typeof ee > "u" || t.name !== "ErrnoError") throw t;
            return -t.Rb;
          }
        },
        H: function(e, t) {
          try {
            return e = e ? H(E, e) : "", Yt(Ht, e, t);
          } catch (r) {
            if (typeof ee > "u" || r.name !== "ErrnoError") throw r;
            return -r.Rb;
          }
        },
        r: function(e, t, r) {
          try {
            if (t = t ? H(E, t) : "", t = st(e, t), r === 0) {
              e = t;
              var i = Ee(e, { parent: !0 }).node;
              if (!i) throw new S(44);
              var o = Mt(e), g = rt(i, o), d = Jn(i, o, !1);
              if (d) throw new S(d);
              if (!i.Fb.rc) throw new S(63);
              if (g.cc) throw new S(10);
              i.Fb.rc(i, o), Xn(g);
            } else r === 512 ? nr(t) : he("Invalid flags passed to unlinkat");
            return 0;
          } catch (v) {
            if (typeof ee > "u" || v.name !== "ErrnoError") throw v;
            return -v.Rb;
          }
        },
        q: function(e, t, r) {
          try {
            if (t = t ? H(E, t) : "", t = st(e, t, !0), r) {
              var i = Q[r >> 2] + 4294967296 * C[r + 4 >> 2], o = C[r + 8 >> 2];
              g = 1e3 * i + o / 1e6, r += 16, i = Q[r >> 2] + 4294967296 * C[r + 4 >> 2], o = C[r + 8 >> 2], d = 1e3 * i + o / 1e6;
            } else var g = Date.now(), d = g;
            e = g;
            var v = Ee(t, { ac: !0 }).node;
            return v.Fb.Tb(v, { timestamp: Math.max(e, d) }), 0;
          } catch (w) {
            if (typeof ee > "u" || w.name !== "ErrnoError") throw w;
            return -w.Rb;
          }
        },
        k: function(e, t, r) {
          e = new Date(1e3 * Rt(e, t)), C[r >> 2] = e.getSeconds(), C[r + 4 >> 2] = e.getMinutes(), C[r + 8 >> 2] = e.getHours(), C[r + 12 >> 2] = e.getDate(), C[r + 16 >> 2] = e.getMonth(), C[r + 20 >> 2] = e.getFullYear() - 1900, C[r + 24 >> 2] = e.getDay(), t = e.getFullYear(), C[r + 28 >> 2] = (t % 4 !== 0 || t % 100 === 0 && t % 400 !== 0 ? Ti : Ri)[e.getMonth()] + e.getDate() - 1 | 0, C[r + 36 >> 2] = -(60 * e.getTimezoneOffset()), t = new Date(e.getFullYear(), 6, 1).getTimezoneOffset();
          var i = new Date(e.getFullYear(), 0, 1).getTimezoneOffset();
          C[r + 32 >> 2] = (t != i && e.getTimezoneOffset() == Math.min(i, t)) | 0;
        },
        i: function(e, t, r, i, o, g, d, v) {
          o = Rt(o, g);
          try {
            if (isNaN(o)) return 61;
            var w = Ae(i);
            if (t & 2 && !(r & 2) && (w.flags & 2097155) !== 2) throw new S(2);
            if ((w.flags & 2097155) === 1) throw new S(2);
            if (!w.Pb.nc) throw new S(43);
            var p = w.Pb.nc(w, e, o, t, r), R = p.Rc;
            return C[d >> 2] = p.Fc, Q[v >> 2] = R, 0;
          } catch (x) {
            if (typeof ee > "u" || x.name !== "ErrnoError") throw x;
            return -x.Rb;
          }
        },
        j: function(e, t, r, i, o, g, d) {
          g = Rt(g, d);
          try {
            if (isNaN(g)) return 61;
            var v = Ae(o);
            if (r & 2) {
              if ((v.node.mode & 61440) !== 32768) throw new S(43);
              i & 2 || v.Pb.oc && v.Pb.oc(v, E.slice(e, e + t), g, t, i);
            }
          } catch (w) {
            if (typeof ee > "u" || w.name !== "ErrnoError") throw w;
            return -w.Rb;
          }
        },
        s: (e, t, r) => {
          function i(w) {
            return (w = w.toTimeString().match(/\(([A-Za-z ]+)\)$/)) ? w[1] : "GMT";
          }

          var o = new Date().getFullYear(), g = new Date(o, 0, 1), d = new Date(o, 6, 1);
          o = g.getTimezoneOffset();
          var v = d.getTimezoneOffset();
          Q[e >> 2] = 60 * Math.max(o, v), C[t >> 2] = +(o != v), e = i(g), t = i(d), e = lr(e), t = lr(t), v < o ? (Q[r >> 2] = e, Q[r + 4 >> 2] = t) : (Q[r >> 2] = t, Q[r + 4 >> 2] = e);
        },
        e: () => Date.now(),
        d: () => performance.now(),
        t: (e, t, r) => E.copyWithin(e, t, t + r),
        o: e => {
          var t = E.length;
          if (e >>>= 0, 2147483648 < e) return !1;
          for (var r = 1; 4 >= r; r *= 2) {
            var i = t * (1 + .2 / r);
            i = Math.min(i, e + 100663296);
            var o = Math;
            i = Math.max(e, i);
            e:{
              o = (o.min.call(o, 2147483648, i + (65536 - i % 65536) % 65536) - u.buffer.byteLength + 65535) / 65536;
              try {
                u.grow(o), W();
                var g = 1;
                break e;
              } catch {
              }
              g = void 0;
            }
            if (g) return !0;
          }
          return !1;
        },
        B: (e, t) => {
          var r = 0;
          return fr().forEach((i, o) => {
            var g = t + r;
            for (o = Q[e + 4 * o >> 2] = g, g = 0; g < i.length; ++g) y[o++ >> 0] = i.charCodeAt(g);
            y[o >> 0] = 0, r += i.length + 1;
          }), 0;
        },
        C: (e, t) => {
          var r = fr();
          Q[e >> 2] = r.length;
          var i = 0;
          return r.forEach(o => i += o.length + 1), Q[t >> 2] = i, 0;
        },
        f: function(e) {
          try {
            var t = Ae(e);
            if (t.Zb === null) throw new S(8);
            t.sc && (t.sc = null);
            try {
              t.Pb.close && t.Pb.close(t);
            } catch (r) {
              throw r;
            } finally {
              vt[t.Zb] = null;
            }
            return t.Zb = null, 0;
          } catch (r) {
            if (typeof ee > "u" || r.name !== "ErrnoError") throw r;
            return r.Rb;
          }
        },
        p: function(e, t) {
          try {
            var r = Ae(e);
            return y[t >> 0] = r.Vb ? 2 : ke(r.mode) ? 3 : (r.mode & 61440) === 40960 ? 7 : 4, K[t + 2 >> 1] = 0, se = [0, (U = 0, 1 <= +Math.abs(U) ? 0 < U ? +Math.floor(U / 4294967296) >>> 0 : ~~+Math.ceil((U - +(~~U >>> 0)) / 4294967296) >>> 0 : 0)], C[t + 8 >> 2] = se[0], C[t + 12 >> 2] = se[1], se = [0, (U = 0, 1 <= +Math.abs(U) ? 0 < U ? +Math.floor(U / 4294967296) >>> 0 : ~~+Math.ceil((U - +(~~U >>> 0)) / 4294967296) >>> 0 : 0)], C[t + 16 >> 2] = se[0], C[t + 20 >> 2] = se[1], 0;
          } catch (i) {
            if (typeof ee > "u" || i.name !== "ErrnoError") throw i;
            return i.Rb;
          }
        },
        y: function(e, t, r, i) {
          try {
            e:{
              var o = Ae(e);
              e = t;
              for (var g, d = t = 0; d < r; d++) {
                var v = Q[e >> 2], w = Q[e + 4 >> 2];
                e += 8;
                var p = o, R = v, x = w, T = g, z = y;
                if (0 > x || 0 > T) throw new S(28);
                if (p.Zb === null) throw new S(8);
                if ((p.flags & 2097155) === 1) throw new S(8);
                if (ke(p.node.mode)) throw new S(31);
                if (!p.Pb.read) throw new S(28);
                var Y = typeof T < "u";
                if (!Y) T = p.position; else if (!p.seekable) throw new S(70);
                var de = p.Pb.read(p, z, R, x, T);
                Y || (p.position += de);
                var ue = de;
                if (0 > ue) {
                  var Se = -1;
                  break e;
                }
                if (t += ue, ue < w) break;
                typeof g < "u" && (g += ue);
              }
              Se = t;
            }
            return Q[i >> 2] = Se, 0;
          } catch (we) {
            if (typeof ee > "u" || we.name !== "ErrnoError") throw we;
            return we.Rb;
          }
        },
        l: function(e, t, r, i, o) {
          t = Rt(t, r);
          try {
            if (isNaN(t)) return 61;
            var g = Ae(e);
            return ar(g, t, i), se = [g.position >>> 0, (U = g.position, 1 <= +Math.abs(U) ? 0 < U ? +Math.floor(U / 4294967296) >>> 0 : ~~+Math.ceil((U - +(~~U >>> 0)) / 4294967296) >>> 0 : 0)], C[o >> 2] = se[0], C[o + 4 >> 2] = se[1], g.sc && t === 0 && i === 0 && (g.sc = null), 0;
          } catch (d) {
            if (typeof ee > "u" || d.name !== "ErrnoError") throw d;
            return d.Rb;
          }
        },
        E: function(e) {
          try {
            var t = Ae(e);
            return ns(r => {
              var i = t.node.Xb;
              i.type.Tc ? i.type.Tc(i, !1, o => {
                r(o ? 29 : 0);
              }) : r(0);
            });
          } catch (r) {
            if (typeof ee > "u" || r.name !== "ErrnoError") throw r;
            return r.Rb;
          }
        },
        u: function(e, t, r, i) {
          try {
            e:{
              var o = Ae(e);
              e = t;
              for (var g, d = t = 0; d < r; d++) {
                var v = Q[e >> 2], w = Q[e + 4 >> 2];
                e += 8;
                var p = o, R = v, x = w, T = g, z = y;
                if (0 > x || 0 > T) throw new S(28);
                if (p.Zb === null) throw new S(8);
                if (!(p.flags & 2097155)) throw new S(8);
                if (ke(p.node.mode)) throw new S(31);
                if (!p.Pb.write) throw new S(28);
                p.seekable && p.flags & 1024 && ar(p, 0, 2);
                var Y = typeof T < "u";
                if (!Y) T = p.position; else if (!p.seekable) throw new S(70);
                var de = p.Pb.write(p, z, R, x, T, void 0);
                Y || (p.position += de);
                var ue = de;
                if (0 > ue) {
                  var Se = -1;
                  break e;
                }
                t += ue, typeof g < "u" && (g += ue);
              }
              Se = t;
            }
            return Q[i >> 2] = Se, 0;
          } catch (we) {
            if (typeof ee > "u" || we.name !== "ErrnoError") throw we;
            return we.Rb;
          }
        },
        ta: hr,
        P: mr,
        ia: dr,
        da: gr,
        _: _r,
        I: wr,
        ma: pr,
        x: br,
        g: yr,
        pa: Ar,
        ka: xr,
        fa: vr,
        ga: Er,
        h: Sr,
        m: Rr,
        qa: Tr,
        sa: qr,
        ra: kr,
        ea: Ir,
        ha: Cr,
        ja: Lr,
        oa: Pr,
        c: Fr,
        la: Or,
        na: Dr,
        ba: Nr,
        W: Ur,
        aa: $r,
        ca: Br,
        T: zr,
        V: Qr,
        Z: Mr,
        Y: Vr,
        S: Wr,
        R: jr,
        U: Hr,
        $: Kr,
        O: Xr,
        X: Yr,
        Q: Zr
      }, k = function() {
        function e(r) {
          if (r = r.exports, k = r = qi(r), u = k.ua, W(), ce.unshift(k.va), G--, n.monitorRunDependencies && n.monitorRunDependencies(G), G == 0 && qe) {
            var i = qe;
            qe = null, i();
          }
          return r;
        }

        var t = { a: Pi };
        if (G++, n.monitorRunDependencies && n.monitorRunDependencies(G), n.instantiateWasm) try {
          return n.instantiateWasm(t, e);
        } catch (r) {
          re(`Module.instantiateWasm callback failed with error: ${r}`), m(r);
        }
        return _i(t, function(r) {
          e(r.instance);
        }).catch(m), {};
      }();
      n._sqlite3_step = e => (n._sqlite3_step = k.wa)(e), n._sqlite3_malloc = e => (n._sqlite3_malloc = k.xa)(e), n._sqlite3_free = e => (n._sqlite3_free = k.ya)(e), n._sqlite3_bind_blob = (e, t, r, i, o) => (n._sqlite3_bind_blob = k.za)(e, t, r, i, o), n._sqlite3_bind_int = (e, t, r) => (n._sqlite3_bind_int = k.Aa)(e, t, r), n._sqlite3_bind_int64 = (e, t, r, i) => (n._sqlite3_bind_int64 = k.Ba)(e, t, r, i), n._sqlite3_bind_double = (e, t, r) => (n._sqlite3_bind_double = k.Ca)(e, t, r), n._sqlite3_bind_null = (e, t) => (n._sqlite3_bind_null = k.Da)(e, t), n._sqlite3_clear_bindings = e => (n._sqlite3_clear_bindings = k.Ea)(e), n._sqlite3_bind_text = (e, t, r, i, o) => (n._sqlite3_bind_text = k.Fa)(e, t, r, i, o), n._sqlite3_close = e => (n._sqlite3_close = k.Ga)(e), n._sqlite3_column_type = (e, t) => (n._sqlite3_column_type = k.Ha)(e, t), n._sqlite3_column_count = e => (n._sqlite3_column_count = k.Ia)(e), n._sqlite3_column_text = (e, t) => (n._sqlite3_column_text = k.Ja)(e, t), n._sqlite3_column_blob = (e, t) => (n._sqlite3_column_blob = k.Ka)(e, t), n._sqlite3_column_bytes = (e, t) => (n._sqlite3_column_bytes = k.La)(e, t), n._sqlite3_column_double = (e, t) => (n._sqlite3_column_double = k.Ma)(e, t), n._sqlite3_column_int = (e, t) => (n._sqlite3_column_int = k.Na)(e, t), n._sqlite3_column_int64 = (e, t) => (n._sqlite3_column_int64 = k.Oa)(e, t), n._sqlite3_column_name = (e, t) => (n._sqlite3_column_name = k.Pa)(e, t), n._sqlite3_declare_vtab = (e, t) => (n._sqlite3_declare_vtab = k.Qa)(e, t), n._sqlite3_errmsg = e => (n._sqlite3_errmsg = k.Ra)(e), n._sqlite3_exec = (e, t, r, i, o) => (n._sqlite3_exec = k.Sa)(e, t, r, i, o), n._sqlite3_finalize = e => (n._sqlite3_finalize = k.Ta)(e), n._sqlite3_prepare_v2 = (e, t, r, i, o) => (n._sqlite3_prepare_v2 = k.Ua)(e, t, r, i, o), n._sqlite3_result_int = (e, t) => (n._sqlite3_result_int = k.Va)(e, t), n._sqlite3_result_blob = (e, t, r, i) => (n._sqlite3_result_blob = k.Wa)(e, t, r, i), n._sqlite3_result_int64 = (e, t, r) => (n._sqlite3_result_int64 = k.Xa)(e, t, r), n._sqlite3_result_double = (e, t) => (n._sqlite3_result_double = k.Ya)(e, t), n._sqlite3_result_null = e => (n._sqlite3_result_null = k.Za)(e), n._sqlite3_result_error = (e, t, r) => (n._sqlite3_result_error = k._a)(e, t, r), n._sqlite3_result_text = (e, t, r, i) => (n._sqlite3_result_text = k.$a)(e, t, r, i), n._sqlite3_sql = e => (n._sqlite3_sql = k.ab)(e), n._sqlite3_reset = e => (n._sqlite3_reset = k.bb)(e), n._sqlite3_value_text = e => (n._sqlite3_value_text = k.cb)(e), n._sqlite3_value_type = e => (n._sqlite3_value_type = k.db)(e), n._sqlite3_value_bytes = e => (n._sqlite3_value_bytes = k.eb)(e), n._sqlite3_value_blob = e => (n._sqlite3_value_blob = k.fb)(e), n._sqlite3_value_int = e => (n._sqlite3_value_int = k.gb)(e), n._sqlite3_value_int64 = e => (n._sqlite3_value_int64 = k.hb)(e), n._sqlite3_value_double = e => (n._sqlite3_value_double = k.ib)(e), n._sqlite3_get_autocommit = e => (n._sqlite3_get_autocommit = k.jb)(e), n._sqlite3_vfs_find = e => (n._sqlite3_vfs_find = k.kb)(e), n._sqlite3_data_count = e => (n._sqlite3_data_count = k.lb)(e), n._sqlite3_bind_parameter_count = e => (n._sqlite3_bind_parameter_count = k.mb)(e), n._sqlite3_bind_parameter_name = (e, t) => (n._sqlite3_bind_parameter_name = k.nb)(e, t), n._sqlite3_libversion = () => (n._sqlite3_libversion = k.ob)(), n._sqlite3_libversion_number = () => (n._sqlite3_libversion_number = k.pb)(), n._sqlite3_changes = e => (n._sqlite3_changes = k.qb)(e), n._sqlite3_limit = (e, t, r) => (n._sqlite3_limit = k.rb)(e, t, r), n._sqlite3_open_v2 = (e, t, r, i) => (n._sqlite3_open_v2 = k.sb)(e, t, r, i);
      var os = () => (os = k.tb)(), bn = n._malloc = e => (bn = n._malloc = k.ub)(e),
        as = n._free = e => (as = n._free = k.vb)(e);
      n._RegisterExtensionFunctions = e => (n._RegisterExtensionFunctions = k.wb)(e), n._set_authorizer = e => (n._set_authorizer = k.xb)(e), n._create_function = (e, t, r, i, o, g) => (n._create_function = k.yb)(e, t, r, i, o, g), n._update_hook = (e, t) => (n._update_hook = k.zb)(e, t), n._create_module = (e, t, r, i) => (n._create_module = k.Ab)(e, t, r, i), n._progress_handler = (e, t) => (n._progress_handler = k.Bb)(e, t), n._register_vfs = (e, t, r, i) => (n._register_vfs = k.Cb)(e, t, r, i), n._getSqliteFree = () => (n._getSqliteFree = k.Db)();
      var cs = n._main = (e, t) => (cs = n._main = k.Eb)(e, t), us = (e, t) => (us = k.Gb)(e, t),
        ls = () => (ls = k.Hb)(), fs = () => (fs = k.Ib)(), hs = e => (hs = k.Jb)(e), yn = e => (yn = k.Kb)(e),
        ms = e => (ms = k.Lb)(e), ds = () => (ds = k.Mb)(), gs = e => (gs = k.Nb)(e), _s = () => (_s = k.Ob)();
      n.getTempRet0 = ls, n.ccall = Le, n.cwrap = (e, t, r, i) => {
        var o = !r || r.every(g => g === "number" || g === "boolean");
        return t !== "string" && o && !i ? n["_" + e] : function() {
          return Le(e, t, r, arguments, i);
        };
      }, n.setValue = Fe, n.getValue = me, n.UTF8ToString = (e, t) => e ? H(E, e, t) : "", n.stringToUTF8 = (e, t, r) => nt(e, E, t, r), n.lengthBytesUTF8 = tt;
      var tn;
      qe = function e() {
        tn || ws(), tn || (qe = e);
      };

      function ws() {
        function e() {
          if (!tn && (tn = !0, n.calledRun = !0, !a)) {
            if (n.noFSInit || ur || (ur = !0, cr(), n.stdin = n.stdin, n.stdout = n.stdout, n.stderr = n.stderr, n.stdin ? Et("stdin", n.stdin) : mn("/dev/tty", "/dev/stdin"), n.stdout ? Et("stdout", null, n.stdout) : mn("/dev/tty", "/dev/stdout"), n.stderr ? Et("stderr", null, n.stderr) : mn("/dev/tty1", "/dev/stderr"), Kt("/dev/stdin", 0), Kt("/dev/stdout", 1), Kt("/dev/stderr", 1)), Kn = !1, Qt(ce), Qt(be), c(n), n.onRuntimeInitialized && n.onRuntimeInitialized(), ps) {
              var t = cs;
              try {
                var r = t(0, 0);
                _ = r, Gr(r);
              } catch (i) {
                wn(i);
              }
            }
            if (n.postRun) for (typeof n.postRun == "function" && (n.postRun = [n.postRun]); n.postRun.length;) t = n.postRun.shift(), ye.unshift(t);
            Qt(ye);
          }
        }

        if (!(0 < G)) {
          if (n.preRun) for (typeof n.preRun == "function" && (n.preRun = [n.preRun]); n.preRun.length;) ve();
          Qt(X), 0 < G || (n.setStatus ? (n.setStatus("Running..."), setTimeout(function() {
            setTimeout(function() {
              n.setStatus("");
            }, 1), e();
          }, 1)) : e());
        }
      }

      if (n.preInit) for (typeof n.preInit == "function" && (n.preInit = [n.preInit]); 0 < n.preInit.length;) n.preInit.pop()();
      var ps = !0;
      return n.noInitialRun && (ps = !1), ws(), s.ready;
    };
  })();
  const D = 0, Tt = 5, ae = 10, En = 12, Sn = 14, He = 21, nn = 25, Ss = 27, it = 100, Rs = 101, Ts = 3850, qs = 522,
    ks = 1, Rn = 2, rn = 4, Is = 8, Cs = 64, ot = 0, Ke = 1, qt = 2, Ls = 3, kt = 4, Ps = 512, Fs = 1024, Os = 2048,
    Ds = 16384, Tn = 1, qn = 2, kn = 3, In = 4, Cn = 5, Ns = 1, Ln = 0x7fffffffffffffffn, Pn = -0x8000000000000000n;

  class Ne extends Error {
    constructor(s, n) {
      super(s), this.code = n;
    }
  }

  const at = !0;

  function Us(h) {
    const s = {}, n = h._getSqliteFree(), c = h._malloc(8), m = [c, c + 4];

    function f(l) {
      if (typeof l != "string") return 0;
      const u = h.lengthBytesUTF8(l), a = h._sqlite3_malloc(u + 1);
      return h.stringToUTF8(l, a, u + 1), a;
    }

    function A(l, u) {
      return BigInt(u) << 32n | BigInt(l) & 0xffffffffn;
    }

    const q = function() {
      const l = BigInt(Number.MAX_SAFE_INTEGER) >> 32n, u = BigInt(Number.MIN_SAFE_INTEGER) >> 32n;
      return function(a, _) {
        return _ > l || _ < u ? A(a, _) : _ * 4294967296 + (a & 2147483647) - (a & 2147483648);
      };
    }(), F = new Set;

    function N(l) {
      if (!F.has(l)) throw new Ne("not a database", He);
    }

    const I = new Map;

    function L(l) {
      if (!I.has(l)) throw new Ne("not a statement", He);
    }

    s.bind_collection = function(l, u) {
      L(l);
      const a = Array.isArray(u), _ = s.bind_parameter_count(l);
      for (let y = 1; y <= _; ++y) {
        const E = a ? y - 1 : s.bind_parameter_name(l, y), K = u[E];
        K !== void 0 && s.bind(l, y, K);
      }
      return D;
    }, s.bind = function(l, u, a) {
      switch (L(l), typeof a) {
        case"number":
          return a === (a | 0) ? s.bind_int(l, u, a) : s.bind_double(l, u, a);
        case"string":
          return s.bind_text(l, u, a);
        default:
          if (a instanceof Uint8Array || Array.isArray(a)) return s.bind_blob(l, u, a);
          if (a === null) return s.bind_null(l, u);
          if (typeof a == "bigint") return s.bind_int64(l, u, a);
          if (a === void 0) return Ss;
          throw new Error("Unknown binding type " + typeof a);
      }
    }, s.bind_blob = function() {
      const l = "sqlite3_bind_blob", u = h.cwrap(l, ...$("nnnnn:n"));
      return function(a, _, y) {
        L(a);
        const E = y.byteLength ?? y.length, K = h._sqlite3_malloc(E);
        h.HEAPU8.subarray(K).set(y);
        const C = u(a, _, K, E, n);
        return V(l, C, I.get(a));
      };
    }(), s.bind_parameter_count = function() {
      const u = h.cwrap("sqlite3_bind_parameter_count", ...$("n:n"));
      return function(a) {
        return L(a), u(a);
      };
    }(), s.bind_double = function() {
      const l = "sqlite3_bind_double", u = h.cwrap(l, ...$("nnn:n"));
      return function(a, _, y) {
        L(a);
        const E = u(a, _, y);
        return V(l, E, I.get(a));
      };
    }(), s.bind_int = function() {
      const l = "sqlite3_bind_int", u = h.cwrap(l, ...$("nnn:n"));
      return function(a, _, y) {
        if (L(a), y > 2147483647 || y < -2147483648) return nn;
        const E = u(a, _, y);
        return V(l, E, I.get(a));
      };
    }(), s.bind_int64 = function() {
      const l = "sqlite3_bind_int64", u = h.cwrap(l, ...$("nnnn:n"));
      return function(a, _, y) {
        if (L(a), y > Ln || y < Pn) return nn;
        const E = y & 0xffffffffn, K = y >> 32n, C = u(a, _, Number(E), Number(K));
        return V(l, C, I.get(a));
      };
    }(), s.bind_null = function() {
      const l = "sqlite3_bind_null", u = h.cwrap(l, ...$("nn:n"));
      return function(a, _) {
        L(a);
        const y = u(a, _);
        return V(l, y, I.get(a));
      };
    }(), s.bind_parameter_name = function() {
      const u = h.cwrap("sqlite3_bind_parameter_name", ...$("n:s"));
      return function(a, _) {
        return L(a), u(a, _);
      };
    }(), s.bind_text = function() {
      const l = "sqlite3_bind_text", u = h.cwrap(l, ...$("nnnnn:n"));
      return function(a, _, y) {
        L(a);
        const E = f(y), K = u(a, _, E, -1, n);
        return V(l, K, I.get(a));
      };
    }(), s.changes = function() {
      const u = h.cwrap("sqlite3_changes", ...$("n:n"));
      return function(a) {
        return N(a), u(a);
      };
    }(), s.close = function() {
      const l = "sqlite3_close", u = h.cwrap(l, ...$("n:n"), { async: at });
      return async function(a) {
        N(a);
        const _ = await u(a);
        return F.delete(a), V(l, _, a);
      };
    }(), s.column = function(l, u) {
      L(l);
      const a = s.column_type(l, u);
      switch (a) {
        case In:
          return s.column_blob(l, u);
        case qn:
          return s.column_double(l, u);
        case Tn:
          const _ = s.column_int(l, u), y = h.getTempRet0();
          return q(_, y);
        case Cn:
          return null;
        case kn:
          return s.column_text(l, u);
        default:
          throw new Ne("unknown type", a);
      }
    }, s.column_blob = function() {
      const u = h.cwrap("sqlite3_column_blob", ...$("nn:n"));
      return function(a, _) {
        L(a);
        const y = s.column_bytes(a, _), E = u(a, _), K = h.HEAPU8.subarray(E, E + y), C = new ArrayBuffer(K.byteLength),
          Q = new Uint8Array(C);
        return Q.set(K), Q;
      };
    }(), s.column_bytes = function() {
      const u = h.cwrap("sqlite3_column_bytes", ...$("nn:n"));
      return function(a, _) {
        return L(a), u(a, _);
      };
    }(), s.column_count = function() {
      const u = h.cwrap("sqlite3_column_count", ...$("n:n"));
      return function(a) {
        return L(a), u(a);
      };
    }(), s.column_double = function() {
      const u = h.cwrap("sqlite3_column_double", ...$("nn:n"));
      return function(a, _) {
        return L(a), u(a, _);
      };
    }(), s.column_int = function() {
      const u = h.cwrap("sqlite3_column_int64", ...$("nn:n"));
      return function(a, _) {
        return L(a), u(a, _);
      };
    }(), s.column_int64 = function() {
      const u = h.cwrap("sqlite3_column_int64", ...$("nn:n"));
      return function(a, _) {
        L(a);
        const y = u(a, _), E = h.getTempRet0();
        return A(y, E);
      };
    }(), s.column_name = function() {
      const u = h.cwrap("sqlite3_column_name", ...$("nn:s"));
      return function(a, _) {
        return L(a), u(a, _);
      };
    }(), s.column_names = function(l) {
      const u = [], a = s.column_count(l);
      for (let _ = 0; _ < a; ++_) u.push(s.column_name(l, _));
      return u;
    }, s.column_text = function() {
      const u = h.cwrap("sqlite3_column_text", ...$("nn:s"));
      return function(a, _) {
        return L(a), u(a, _);
      };
    }(), s.column_type = function() {
      const u = h.cwrap("sqlite3_column_type", ...$("nn:n"));
      return function(a, _) {
        return L(a), u(a, _);
      };
    }(), s.update_hook = function(l, u) {
      return N(l), h.updateHook(l, u), D;
    }, s.create_function = function(l, u, a, _, y, E, K, C) {
      if (N(l), E && !K && !C) {
        const Q = h.createFunction(l, u, a, _, y, E);
        return V("sqlite3_create_function", Q, l);
      }
      if (!E && K && C) {
        const Q = h.createAggregate(l, u, a, _, y, K, C);
        return V("sqlite3_create_function", Q, l);
      }
      throw new Ne("invalid function combination", He);
    }, s.create_module = function(l, u, a, _) {
      N(l);
      const y = h.createModule(l, u, a, _);
      return V("sqlite3_create_module", y, l);
    }, s.data_count = function() {
      const u = h.cwrap("sqlite3_data_count", ...$("n:n"));
      return function(a) {
        return L(a), u(a);
      };
    }(), s.declare_vtab = function() {
      const u = h.cwrap("sqlite3_declare_vtab", ...$("ns:n"));
      return function(a, _) {
        const y = u(a, _);
        return V("sqlite3_declare_vtab", y);
      };
    }(), s.exec = async function(l, u, a) {
      for await(const _ of s.statements(l, u)) {
        let y;
        for (; await s.step(_) === it;) if (a) {
          y = y ?? s.column_names(_);
          const E = s.row(_);
          await a(E, y);
        }
      }
      return D;
    }, s.finalize = function() {
      const u = h.cwrap("sqlite3_finalize", ...$("n:n"), { async: at });
      return async function(a) {
        if (!I.has(a)) return He;
        const _ = await u(a);
        return I.get(a), I.delete(a), _;
      };
    }(), s.get_autocommit = function() {
      const u = h.cwrap("sqlite3_get_autocommit", ...$("n:n"));
      return function(a) {
        return u(a);
      };
    }(), s.libversion = function() {
      const u = h.cwrap("sqlite3_libversion", ...$(":s"));
      return function() {
        return u();
      };
    }(), s.libversion_number = function() {
      const u = h.cwrap("sqlite3_libversion_number", ...$(":n"));
      return function() {
        return u();
      };
    }(), s.limit = function() {
      const u = h.cwrap("sqlite3_limit", ...$("nnn:n"));
      return function(a, _, y) {
        return u(a, _, y);
      };
    }(), s.open_v2 = function() {
      const l = "sqlite3_open_v2", u = h.cwrap(l, ...$("snnn:n"), { async: at });
      return async function(a, _, y) {
        _ = _ || rn | Rn, y = f(y);
        const E = await u(a, m[0], _, y), K = h.getValue(m[0], "*");
        return F.add(K), h._sqlite3_free(y), h.ccall("RegisterExtensionFunctions", "void", ["number"], [K]), V(l, E), K;
      };
    }(), s.prepare_v2 = function() {
      const l = "sqlite3_prepare_v2", u = h.cwrap(l, ...$("nnnnn:n"), { async: at });
      return async function(a, _) {
        const y = await u(a, _, -1, m[0], m[1]);
        V(l, y, a);
        const E = h.getValue(m[0], "*");
        return E ? (I.set(E, a), { stmt: E, sql: h.getValue(m[1], "*") }) : null;
      };
    }(), s.progress_handler = function(l, u, a, _) {
      N(l), h.progressHandler(l, u, a, _);
    }, s.reset = function() {
      const l = "sqlite3_reset", u = h.cwrap(l, ...$("n:n"), { async: at });
      return async function(a) {
        L(a);
        const _ = await u(a);
        return V(l, _, I.get(a));
      };
    }(), s.result = function(l, u) {
      switch (typeof u) {
        case"number":
          u === (u | 0) ? s.result_int(l, u) : s.result_double(l, u);
          break;
        case"string":
          s.result_text(l, u);
          break;
        default:
          if (u instanceof Uint8Array || Array.isArray(u)) s.result_blob(l, u); else if (u === null) s.result_null(l); else {
            if (typeof u == "bigint") return s.result_int64(l, u);
            console.warn("unknown result converted to null", u), s.result_null(l);
          }
          break;
      }
    }, s.result_blob = function() {
      const u = h.cwrap("sqlite3_result_blob", ...$("nnnn:n"));
      return function(a, _) {
        const y = _.byteLength ?? _.length, E = h._sqlite3_malloc(y);
        h.HEAPU8.subarray(E).set(_), u(a, E, y, n);
      };
    }(), s.result_double = function() {
      const u = h.cwrap("sqlite3_result_double", ...$("nn:n"));
      return function(a, _) {
        u(a, _);
      };
    }(), s.result_int = function() {
      const u = h.cwrap("sqlite3_result_int", ...$("nn:n"));
      return function(a, _) {
        u(a, _);
      };
    }(), s.result_int64 = function() {
      const u = h.cwrap("sqlite3_result_int64", ...$("nnn:n"));
      return function(a, _) {
        if (_ > Ln || _ < Pn) return nn;
        const y = _ & 0xffffffffn, E = _ >> 32n;
        u(a, Number(y), Number(E));
      };
    }(), s.result_null = function() {
      const u = h.cwrap("sqlite3_result_null", ...$("n:n"));
      return function(a) {
        u(a);
      };
    }(), s.result_text = function() {
      const u = h.cwrap("sqlite3_result_text", ...$("nnnn:n"));
      return function(a, _) {
        const y = f(_);
        u(a, y, -1, n);
      };
    }(), s.row = function(l) {
      const u = [], a = s.data_count(l);
      for (let _ = 0; _ < a; ++_) {
        const y = s.column(l, _);
        u.push((y == null ? void 0 : y.buffer) === h.HEAPU8.buffer ? y.slice() : y);
      }
      return u;
    }, s.set_authorizer = function(l, u, a) {
      N(l);
      const _ = h.setAuthorizer(l, u, a);
      return V("sqlite3_set_authorizer", _, l);
    }, s.sql = function() {
      const u = h.cwrap("sqlite3_sql", ...$("n:s"));
      return function(a) {
        return L(a), u(a);
      };
    }(), s.statements = function(l, u) {
      return async function* () {
        const a = s.str_new(l, u);
        let _ = { stmt: null, sql: s.str_value(a) };
        try {
          for (; _ = await s.prepare_v2(l, _.sql);) yield _.stmt, s.finalize(_.stmt), _.stmt = null;
        } finally {
          _ != null && _.stmt && s.finalize(_.stmt), s.str_finish(a);
        }
      }();
    }, s.step = function() {
      const l = "sqlite3_step", u = h.cwrap(l, ...$("n:n"), { async: at });
      return async function(a) {
        L(a);
        const _ = await u(a);
        return V(l, _, I.get(a), [it, Rs]);
      };
    }();
    let oe = 0;
    const re = new Map;
    s.str_new = function(l, u = "") {
      const a = h.lengthBytesUTF8(u), _ = oe++ & 4294967295, y = { offset: h._sqlite3_malloc(a + 1), bytes: a };
      return re.set(_, y), h.stringToUTF8(u, y.offset, y.bytes + 1), _;
    }, s.str_appendall = function(l, u) {
      if (!re.has(l)) throw new Ne("not a string", He);
      const a = re.get(l), _ = h.lengthBytesUTF8(u), y = a.bytes + _, E = h._sqlite3_malloc(y + 1);
      h.HEAPU8.subarray(E, E + y + 1).set(h.HEAPU8.subarray(a.offset, a.offset + a.bytes)), h.stringToUTF8(u, E + a.bytes, _ + 1), h._sqlite3_free(a.offset), a.offset = E, a.bytes = y, re.set(l, a);
    }, s.str_finish = function(l) {
      if (!re.has(l)) throw new Ne("not a string", He);
      const u = re.get(l);
      re.delete(l), h._sqlite3_free(u.offset);
    }, s.str_value = function(l) {
      if (!re.has(l)) throw new Ne("not a string", He);
      return re.get(l).offset;
    }, s.user_data = function(l) {
      return h.getFunctionUserData(l);
    }, s.value = function(l) {
      const u = s.value_type(l);
      switch (u) {
        case In:
          return s.value_blob(l);
        case qn:
          return s.value_double(l);
        case Tn:
          const a = s.value_int(l), _ = h.getTempRet0();
          return q(a, _);
        case Cn:
          return null;
        case kn:
          return s.value_text(l);
        default:
          throw new Ne("unknown type", u);
      }
    }, s.value_blob = function() {
      const u = h.cwrap("sqlite3_value_blob", ...$("n:n"));
      return function(a) {
        const _ = s.value_bytes(a), y = u(a);
        return h.HEAPU8.subarray(y, y + _);
      };
    }(), s.value_bytes = function() {
      const u = h.cwrap("sqlite3_value_bytes", ...$("n:n"));
      return function(a) {
        return u(a);
      };
    }(), s.value_double = function() {
      const u = h.cwrap("sqlite3_value_double", ...$("n:n"));
      return function(a) {
        return u(a);
      };
    }(), s.value_int = function() {
      const u = h.cwrap("sqlite3_value_int64", ...$("n:n"));
      return function(a) {
        return u(a);
      };
    }(), s.value_int64 = function() {
      const u = h.cwrap("sqlite3_value_int64", ...$("n:n"));
      return function(a) {
        const _ = u(a), y = h.getTempRet0();
        return A(_, y);
      };
    }(), s.value_text = function() {
      const u = h.cwrap("sqlite3_value_text", ...$("n:s"));
      return function(a) {
        return u(a);
      };
    }(), s.value_type = function() {
      const u = h.cwrap("sqlite3_value_type", ...$("n:n"));
      return function(a) {
        return u(a);
      };
    }(), s.vfs_register = function(l, u) {
      const a = h.registerVFS(l, u);
      return V("sqlite3_vfs_register", a);
    };

    function V(l, u, a = null, _ = [D]) {
      if (_.includes(u)) return u;
      const y = a ? h.ccall("sqlite3_errmsg", "string", ["number"], [a]) : l;
      throw new Ne(y, u);
    }

    return s;
  }

  function $(h) {
    const s = [], n = h.match(/([ns@]*):([nsv@])/);
    switch (n[2]) {
      case"n":
        s.push("number");
        break;
      case"s":
        s.push("string");
        break;
      case"v":
        s.push(null);
        break;
    }
    const c = [];
    for (let m of n[1]) switch (m) {
      case"n":
        c.push("number");
        break;
      case"s":
        c.push("string");
        break;
    }
    return s.push(c), s;
  }

  class $s {
    constructor() {
      J(this, "mxPathName", 64);
    }

    xClose(s) {
      return ae;
    }

    xRead(s, n, c) {
      return ae;
    }

    xWrite(s, n, c) {
      return ae;
    }

    xTruncate(s, n) {
      return ae;
    }

    xSync(s, n) {
      return D;
    }

    xFileSize(s, n) {
      return ae;
    }

    xLock(s, n) {
      return D;
    }

    xUnlock(s, n) {
      return D;
    }

    xCheckReservedLock(s, n) {
      return n.setInt32(0, 0, !0), D;
    }

    xFileControl(s, n, c) {
      return En;
    }

    xSectorSize(s) {
      return 512;
    }

    xDeviceCharacteristics(s) {
      return 0;
    }

    xOpen(s, n, c, m) {
      return Sn;
    }

    xDelete(s, n) {
      return ae;
    }

    xAccess(s, n, c) {
      return ae;
    }

    handleAsync(s) {
      return s();
    }
  }

  const Bs = ot | Ke | qt | Ls | kt;

  class zs {
    constructor() {
      j(this, wt);
      j(this, Ot);
      j(this, Dt);
      j(this, ge, ot);
      J(this, "timeoutMillis", 0);
      j(this, ut, new Map);
      j(this, _t, Promise.resolve(0));
    }

    get state() {
      return b(this, ge);
    }

    async lock(s) {
      return pe(this, wt, xn).call(this, pe(this, Ot, bs), s);
    }

    async unlock(s) {
      return pe(this, wt, xn).call(this, pe(this, Dt, ys), s);
    }

    async isSomewhereReserved() {
      throw new Error("unimplemented");
    }

    async _NONEtoSHARED() {
    }

    async _SHAREDtoEXCLUSIVE() {
      await this._SHAREDtoRESERVED(), await this._RESERVEDtoEXCLUSIVE();
    }

    async _SHAREDtoRESERVED() {
    }

    async _RESERVEDtoEXCLUSIVE() {
    }

    async _EXCLUSIVEtoRESERVED() {
    }

    async _EXCLUSIVEtoSHARED() {
      await this._EXCLUSIVEtoRESERVED(), await this._RESERVEDtoSHARED();
    }

    async _EXCLUSIVEtoNONE() {
      await this._EXCLUSIVEtoRESERVED(), await this._RESERVEDtoSHARED(), await this._SHAREDtoNONE();
    }

    async _RESERVEDtoSHARED() {
    }

    async _RESERVEDtoNONE() {
      await this._RESERVEDtoSHARED(), await this._SHAREDtoNONE();
    }

    async _SHAREDtoNONE() {
    }

    _acquireWebLock(s, n) {
      return new Promise(async (c, m) => {
        try {
          await navigator.locks.request(s, n, f => {
            if (c(f), f) return new Promise(A => b(this, ut).set(s, A));
          });
        } catch (f) {
          m(f);
        }
      });
    }

    _releaseWebLock(s) {
      var n;
      (n = b(this, ut).get(s)) == null || n(), b(this, ut).delete(s);
    }

    async _pollWebLock(s) {
      var c;
      return (c = (await navigator.locks.query()).held.find(({ name: m }) => m === s)) == null ? void 0 : c.mode;
    }

    _getTimeoutSignal() {
      if (this.timeoutMillis) {
        const s = new AbortController;
        return setTimeout(() => s.abort(), this.timeoutMillis), s.signal;
      }
    }
  }

  ge = new WeakMap, ut = new WeakMap, _t = new WeakMap, wt = new WeakSet, xn = async function(s, n) {
    const c = n & Bs;
    try {
      const m = () => s.call(this, c);
      return await Z(this, _t, b(this, _t).then(m, m)), Z(this, ge, c), D;
    } catch (m) {
      return m.name === "AbortError" ? Tt : (console.error(m), Ts);
    }
  }, Ot = new WeakSet, bs = async function(s) {
    if (s === b(this, ge)) return D;
    switch (b(this, ge)) {
      case ot:
        switch (s) {
          case Ke:
            return this._NONEtoSHARED();
          default:
            throw new Error(`unexpected transition ${b(this, ge)} -> ${s}`);
        }
      case Ke:
        switch (s) {
          case qt:
            return this._SHAREDtoRESERVED();
          case kt:
            return this._SHAREDtoEXCLUSIVE();
          default:
            throw new Error(`unexpected transition ${b(this, ge)} -> ${s}`);
        }
      case qt:
        switch (s) {
          case kt:
            return this._RESERVEDtoEXCLUSIVE();
          default:
            throw new Error(`unexpected transition ${b(this, ge)} -> ${s}`);
        }
      default:
        throw new Error(`unexpected transition ${b(this, ge)} -> ${s}`);
    }
  }, Dt = new WeakSet, ys = async function(s) {
    if (s === b(this, ge)) return D;
    switch (b(this, ge)) {
      case kt:
        switch (s) {
          case Ke:
            return this._EXCLUSIVEtoSHARED();
          case ot:
            return this._EXCLUSIVEtoNONE();
          default:
            throw new Error(`unexpected transition ${b(this, ge)} -> ${s}`);
        }
      case qt:
        switch (s) {
          case Ke:
            return this._RESERVEDtoSHARED();
          case ot:
            return this._RESERVEDtoNONE();
          default:
            throw new Error(`unexpected transition ${b(this, ge)} -> ${s}`);
        }
      case Ke:
        switch (s) {
          case ot:
            return this._SHAREDtoNONE();
          default:
            throw new Error(`unexpected transition ${b(this, ge)} -> ${s}`);
        }
      default:
        throw new Error(`unexpected transition ${b(this, ge)} -> ${s}`);
    }
  };

  class Qs extends zs {
    constructor(s) {
      super(), this._lockName = s + "-outer", this._reservedName = s + "-reserved";
    }

    async isSomewhereReserved() {
      return await this._pollWebLock(this._reservedName) === "exclusive";
    }

    async _NONEtoSHARED() {
      await this._acquireWebLock(this._lockName, { mode: "exclusive", signal: this._getTimeoutSignal() });
    }

    async _SHAREDtoRESERVED() {
      await this._acquireWebLock(this._reservedName, { mode: "exclusive", signal: this._getTimeoutSignal() });
    }

    async _RESERVEDtoSHARED() {
      this._releaseWebLock(this._reservedName);
    }

    async _SHAREDtoNONE() {
      this._releaseWebLock(this._lockName);
    }
  }

  const Ms = 5e3;
  let Vs = 0;
  const sn = new WeakMap;

  function Pe(...h) {
  }

  class Ws {
    constructor(s, n = { durability: "default" }) {
      j(this, Nt);
      j(this, lt, void 0);
      j(this, ft, void 0);
      j(this, pt, void 0);
      j(this, fe, null);
      j(this, bt, 0);
      j(this, Xe, Promise.resolve());
      j(this, Ye, Promise.resolve());
      Z(this, ft, Promise.resolve(s).then(c => Z(this, lt, c))), Z(this, pt, n);
    }

    async close() {
      const s = b(this, lt) ?? await b(this, ft);
      await b(this, Xe), await this.sync(), s.close();
    }

    async run(s, n) {
      const c = b(this, Xe).then(() => pe(this, Nt, As).call(this, s, n));
      return Z(this, Xe, c.catch(() => {
      })), c;
    }

    async sync() {
      await b(this, Xe), await b(this, Ye), Z(this, Ye, Promise.resolve());
    }
  }

  lt = new WeakMap, ft = new WeakMap, pt = new WeakMap, fe = new WeakMap, bt = new WeakMap, Xe = new WeakMap, Ye = new WeakMap, Nt = new WeakSet, As = async function(s, n) {
    var m, f;
    const c = b(this, lt) ?? await b(this, ft);
    if (s === "readwrite" && ((m = b(this, fe)) == null ? void 0 : m.mode) === "readonly") Z(this, fe, null); else if (performance.now() - b(this, bt) > Ms) {
      try {
        (f = b(this, fe)) == null || f.commit();
      } catch (A) {
        if (A.name !== "InvalidStateError") throw A;
      }
      await new Promise(A => setTimeout(A)), Z(this, fe, null);
    }
    for (let A = 0; A < 2; ++A) {
      if (!b(this, fe)) {
        Z(this, fe, c.transaction(c.objectStoreNames, s, b(this, pt)));
        const q = Z(this, bt, performance.now());
        Z(this, Ye, b(this, Ye).then(() => new Promise((F, N) => {
          b(this, fe).addEventListener("complete", I => {
            F(), b(this, fe) === I.target && Z(this, fe, null), Pe(`transaction ${sn.get(I.target)} complete`);
          }), b(this, fe).addEventListener("abort", I => {
            console.warn("tx abort", (performance.now() - q) / 1e3);
            const L = I.target.error;
            N(L), b(this, fe) === I.target && Z(this, fe, null), Pe(`transaction ${sn.get(I.target)} aborted`, L);
          });
        }))), sn.set(b(this, fe), Vs++);
      }
      try {
        const q = Object.fromEntries(Array.from(c.objectStoreNames, F => [F, new js(b(this, fe).objectStore(F))]));
        return await n(q);
      } catch (q) {
        if (Z(this, fe, null), A) throw q;
      }
    }
  };

  function Be(h) {
    return new Promise((s, n) => {
      h.addEventListener("success", () => s(h.result)), h.addEventListener("error", () => n(h.error));
    });
  }

  class js {
    constructor(s) {
      j(this, le, void 0);
      Z(this, le, s);
    }

    get(s) {
      Pe(`get ${b(this, le).name}`, s);
      const n = b(this, le).get(s);
      return Be(n);
    }

    getAll(s, n) {
      Pe(`getAll ${b(this, le).name}`, s, n);
      const c = b(this, le).getAll(s, n);
      return Be(c);
    }

    getKey(s) {
      Pe(`getKey ${b(this, le).name}`, s);
      const n = b(this, le).getKey(s);
      return Be(n);
    }

    getAllKeys(s, n) {
      Pe(`getAllKeys ${b(this, le).name}`, s, n);
      const c = b(this, le).getAllKeys(s, n);
      return Be(c);
    }

    put(s, n) {
      Pe(`put ${b(this, le).name}`, s, n);
      const c = b(this, le).put(s, n);
      return Be(c);
    }

    delete(s) {
      Pe(`delete ${b(this, le).name}`, s);
      const n = b(this, le).delete(s);
      return Be(n);
    }

    clear() {
      Pe(`clear ${b(this, le).name}`);
      const s = b(this, le).clear();
      return Be(s);
    }

    index(s) {
      return new Hs(b(this, le).index(s));
    }
  }

  le = new WeakMap;

  class Hs {
    constructor(s) {
      j(this, Ze, void 0);
      Z(this, Ze, s);
    }

    getAllKeys(s, n) {
      Pe(`IDBIndex.getAllKeys ${b(this, Ze).objectStore.name}<${b(this, Ze).name}>`, s, n);
      const c = b(this, Ze).getAllKeys(s, n);
      return Be(c);
    }
  }

  Ze = new WeakMap;
  const Ks = 512, Fn = 3e3, On = { durability: "default", purge: "deferred", purgeAtLeast: 16 };

  function xe(...h) {
  }

  class Xs extends $s {
    constructor(n = "wa-sqlite", c = On) {
      super();
      j(this, yt);
      j(this, Ut);
      j(this, $t);
      j(this, Qe);
      j(this, Bt);
      j(this, ze, void 0);
      j(this, _e, new Map);
      j(this, ne, void 0);
      j(this, Ge, new Set);
      j(this, Je, performance.now());
      j(this, Ue, new Set);
      this.name = n, Z(this, ze, Object.assign({}, On, c)), Z(this, ne, new Ws(Ys(n), { durability: b(this, ze).durability }));
    }

    async close() {
      var n;
      for (const c of b(this, _e).keys()) await this.xClose(c);
      await ((n = b(this, ne)) == null ? void 0 : n.close()), Z(this, ne, null);
    }

    xOpen(n, c, m, f) {
      return this.handleAsync(async () => {
        n === null && (n = `null_${c}`), xe(`xOpen ${n} 0x${c.toString(16)} 0x${m.toString(16)}`);
        try {
          const A = new URL(n, "http://localhost/"),
            q = { path: A.pathname, flags: m, block0: null, isMetadataChanged: !0, locks: new Qs(A.pathname) };
          return b(this, _e).set(c, q), await b(this, ne).run("readwrite", async ({ blocks: F }) => {
            if (q.block0 = await F.get(pe(this, Qe, gt).call(this, q, 0)), !q.block0) if (m & rn) q.block0 = {
              path: q.path,
              offset: 0,
              version: 0,
              data: new Uint8Array(0),
              fileSize: 0
            }, F.put(q.block0); else throw new Error(`file not found: ${q.path}`);
          }), f.setInt32(0, m & ks, !0), D;
        } catch (A) {
          return console.error(A), Sn;
        }
      });
    }

    xClose(n) {
      return this.handleAsync(async () => {
        try {
          const c = b(this, _e).get(n);
          return c && (xe(`xClose ${c.path}`), b(this, _e).delete(n), c.flags & Is && b(this, ne).run("readwrite", ({ blocks: m }) => {
            m.delete(IDBKeyRange.bound([c.path], [c.path, []]));
          })), D;
        } catch (c) {
          return console.error(c), ae;
        }
      });
    }

    xRead(n, c, m) {
      return this.handleAsync(async () => {
        const f = b(this, _e).get(n);
        xe(`xRead ${f.path} ${c.byteLength} ${m}`);
        try {
          return await b(this, ne).run("readonly", async ({ blocks: q }) => {
            let F = 0;
            for (; F < c.byteLength;) {
              const N = m + F,
                I = N < f.block0.data.byteLength ? f.block0 : await q.get(pe(this, Qe, gt).call(this, f, -N));
              if (!I || I.data.byteLength - I.offset <= N) return c.fill(0, F), qs;
              const L = c.subarray(F), oe = N + I.offset,
                re = Math.min(Math.max(I.data.byteLength - oe, 0), L.byteLength);
              L.set(I.data.subarray(oe, oe + re)), F += re;
            }
            return D;
          });
        } catch (A) {
          return console.error(A), ae;
        }
      });
    }

    xWrite(n, c, m) {
      const f = b(this, Ue).has(n);
      if (f || performance.now() - b(this, Je) > Fn) {
        const A = this.handleAsync(async () => {
          this.handleAsync !== super.handleAsync && b(this, Ue).add(n), await new Promise(F => setTimeout(F));
          const q = pe(this, yt, vn).call(this, n, c, m);
          return Z(this, Je, performance.now()), q;
        });
        return f && b(this, Ue).delete(n), A;
      }
      return pe(this, yt, vn).call(this, n, c, m);
    }

    xTruncate(n, c) {
      const m = b(this, _e).get(n);
      xe(`xTruncate ${m.path} ${c}`);
      try {
        Object.assign(m.block0, { fileSize: c, data: m.block0.data.slice(0, c) });
        const f = Object.assign({}, m.block0);
        return b(this, ne).run("readwrite", ({ blocks: A }) => {
          A.delete(pe(this, Qe, gt).call(this, m, -1 / 0, -c)), A.put(f);
        }), D;
      } catch (f) {
        return console.error(f), ae;
      }
    }

    xSync(n, c) {
      const m = b(this, Ue).has(n);
      if (m || b(this, ze).durability !== "relaxed" || performance.now() - b(this, Je) > Fn) {
        const A = this.handleAsync(async () => {
          this.handleAsync !== super.handleAsync && b(this, Ue).add(n);
          const q = await pe(this, Ut, xs).call(this, n, c);
          return Z(this, Je, performance.now()), q;
        });
        return m && b(this, Ue).delete(n), A;
      }
      const f = b(this, _e).get(n);
      return xe(`xSync ${f.path} ${c}`), D;
    }

    xFileSize(n, c) {
      const m = b(this, _e).get(n);
      return xe(`xFileSize ${m.path}`), c.setBigInt64(0, BigInt(m.block0.fileSize), !0), D;
    }

    xLock(n, c) {
      return this.handleAsync(async () => {
        const m = b(this, _e).get(n);
        xe(`xLock ${m.path} ${c}`);
        try {
          const f = await m.locks.lock(c);
          return f === D && m.locks.state === Ke && (m.block0 = await b(this, ne).run("readonly", ({ blocks: A }) => A.get(pe(this, Qe, gt).call(this, m, 0)))), f;
        } catch (f) {
          return console.error(f), ae;
        }
      });
    }

    xUnlock(n, c) {
      return this.handleAsync(async () => {
        const m = b(this, _e).get(n);
        xe(`xUnlock ${m.path} ${c}`);
        try {
          return m.locks.unlock(c);
        } catch (f) {
          return console.error(f), ae;
        }
      });
    }

    xCheckReservedLock(n, c) {
      return this.handleAsync(async () => {
        const m = b(this, _e).get(n);
        xe(`xCheckReservedLock ${m.path}`);
        const f = await m.locks.isSomewhereReserved();
        return c.setInt32(0, f ? 1 : 0, !0), D;
      });
    }

    xSectorSize(n) {
      return Ks;
    }

    xDeviceCharacteristics(n) {
      return Ds | Ps | Fs | Os;
    }

    xFileControl(n, c, m) {
      const f = b(this, _e).get(n);
      switch (xe(`xFileControl ${f.path} ${c}`), c) {
        case 11:
          return f.overwrite = !0, D;
        case 21:
          if (f.overwrite) try {
            return this.handleAsync(async () => (await pe(this, Bt, Es).call(this, f), D));
          } catch (A) {
            return console.error(A), ae;
          }
          if (f.isMetadataChanged) try {
            b(this, ne).run("readwrite", async ({ blocks: A }) => {
              await A.put(f.block0);
            }), f.isMetadataChanged = !1;
          } catch (A) {
            return console.error(A), ae;
          }
          return D;
        case 22:
          return f.overwrite = !1, D;
        case 31:
          return this.handleAsync(async () => {
            try {
              return f.block0.version--, f.changedPages = new Set, b(this, ne).run("readwrite", async ({ blocks: A }) => {
                const q = await A.index("version").getAllKeys(IDBKeyRange.bound([f.path], [f.path, f.block0.version]));
                for (const F of q) A.delete(F);
              }), D;
            } catch (A) {
              return console.error(A), ae;
            }
          });
        case 32:
          try {
            const A = Object.assign({}, f.block0);
            A.data = A.data.slice();
            const q = f.changedPages;
            return f.changedPages = null, f.isMetadataChanged = !1, b(this, ne).run("readwrite", async ({ blocks: F }) => {
              F.put(A);
              const N = await F.get([f.path, "purge", 0]) ?? {
                path: f.path,
                offset: "purge",
                version: 0,
                data: new Map,
                count: 0
              };
              N.count += q.size;
              for (const I of q) N.data.set(I, A.version);
              F.put(N), pe(this, $t, vs).call(this, f.path, N.count);
            }), D;
          } catch (A) {
            return console.error(A), ae;
          }
        case 33:
          return this.handleAsync(async () => {
            try {
              return f.changedPages = null, f.isMetadataChanged = !1, f.block0 = await b(this, ne).run("readonly", ({ blocks: A }) => A.get([f.path, 0, f.block0.version + 1])), D;
            } catch (A) {
              return console.error(A), ae;
            }
          });
        default:
          return En;
      }
    }

    xAccess(n, c, m) {
      return this.handleAsync(async () => {
        try {
          const f = new URL(n, "file://localhost/").pathname;
          xe(`xAccess ${f} ${c}`);
          const A = await b(this, ne).run("readonly", ({ blocks: q }) => q.getKey(pe(this, Qe, gt).call(this, { path: f }, 0)));
          return m.setInt32(0, A ? 1 : 0, !0), D;
        } catch (f) {
          return console.error(f), ae;
        }
      });
    }

    xDelete(n, c) {
      return this.handleAsync(async () => {
        const m = new URL(n, "file://localhost/").pathname;
        try {
          return b(this, ne).run("readwrite", ({ blocks: f }) => f.delete(IDBKeyRange.bound([m], [m, []]))), c && await b(this, ne).sync(), D;
        } catch (f) {
          return console.error(f), ae;
        }
      });
    }

    async purge(n) {
      const c = Date.now();
      await b(this, ne).run("readwrite", async ({ blocks: m }) => {
        const f = await m.get([n, "purge", 0]);
        if (f) {
          for (const [A, q] of f.data) m.delete(IDBKeyRange.bound([n, A, q], [n, A, 1 / 0], !0, !1));
          await m.delete([n, "purge", 0]);
        }
        xe(`purge ${n} ${(f == null ? void 0 : f.data.size) ?? 0} pages in ${Date.now() - c} ms`);
      });
    }
  }

  ze = new WeakMap, _e = new WeakMap, ne = new WeakMap, Ge = new WeakMap, Je = new WeakMap, Ue = new WeakMap, yt = new WeakSet, vn = function(n, c, m) {
    const f = b(this, _e).get(n);
    xe(`xWrite ${f.path} ${c.byteLength} ${m}`);
    try {
      const A = f.block0.fileSize;
      f.block0.fileSize < m + c.byteLength && (f.block0.fileSize = m + c.byteLength, f.isMetadataChanged = !0);
      const q = m === 0 ? f.block0 : { path: f.path, offset: -m, version: f.block0.version, data: null };
      return q.data = c.slice(), f.changedPages ? (A === f.block0.fileSize && f.changedPages.add(-m), m !== 0 && b(this, ne).run("readwrite", ({ blocks: F }) => F.put(q))) : b(this, ne).run("readwrite", ({ blocks: F }) => F.put(q)), f.isMetadataChanged = m === 0 ? !1 : f.isMetadataChanged, D;
    } catch (A) {
      return console.error(A), ae;
    }
  }, Ut = new WeakSet, xs = async function(n, c) {
    const m = b(this, _e).get(n);
    xe(`xSync ${m.path} ${c}`);
    try {
      m.isMetadataChanged && (b(this, ne).run("readwrite", async ({ blocks: f }) => {
        await f.put(m.block0);
      }), m.isMetadataChanged = !1), await b(this, ne).sync();
    } catch (f) {
      return console.error(f), ae;
    }
    return D;
  }, $t = new WeakSet, vs = function(n, c) {
    b(this, ze).purge === "manual" || b(this, Ge).has(n) || c < b(this, ze).purgeAtLeast || (globalThis.requestIdleCallback ? globalThis.requestIdleCallback(() => {
      this.purge(n), b(this, Ge).delete(n);
    }) : setTimeout(() => {
      this.purge(n), b(this, Ge).delete(n);
    }), b(this, Ge).add(n));
  }, Qe = new WeakSet, gt = function(n, c, m = 0) {
    const f = !c || -c < n.block0.data.length ? -1 / 0 : n.block0.version;
    return IDBKeyRange.bound([n.path, c, f], [n.path, m, 1 / 0]);
  }, Bt = new WeakSet, Es = async function(n) {
    const c = n.block0.data.length;
    if (c < 18) return;
    const m = new DataView(n.block0.data.buffer, n.block0.data.byteOffset);
    let f = m.getUint16(16);
    if (f === 1 && (f = 65536), f === c) return;
    const A = Math.max(c, f), q = A / c, F = A / f, I = m.getUint32(28) * f, L = n.block0.version;
    await b(this, ne).run("readwrite", async ({ blocks: oe }) => {
      const re = await oe.index("version").getAllKeys(IDBKeyRange.bound([n.path, L + 1], [n.path, 1 / 0]));
      for (const V of re) oe.delete(V);
      oe.delete([n.path, "purge", 0]);
      for (let V = 0; V < I; V += A) {
        const l = await oe.getAll(IDBKeyRange.lowerBound([n.path, -(V + A), 1 / 0]), q);
        for (const u of l) oe.delete([u.path, u.offset, u.version]);
        if (F === 1) {
          const u = new Uint8Array(f);
          for (const _ of l) u.set(_.data, -(V + _.offset));
          const a = { path: n.path, offset: -V, version: L, data: u };
          a.offset === 0 && (a.fileSize = I, n.block0 = a), oe.put(a);
        } else {
          const u = l[0];
          for (let a = 0; a < F; ++a) {
            const _ = -(V + a * f);
            if (-_ >= I) break;
            const y = { path: u.path, offset: _, version: L, data: u.data.subarray(a * f, (a + 1) * f) };
            y.offset === 0 && (y.fileSize = I, n.block0 = y), oe.put(y);
          }
        }
      }
    });
  };

  function Ys(h) {
    return new Promise((s, n) => {
      const c = globalThis.indexedDB.open(h, 5);
      c.addEventListener("upgradeneeded", function() {
        c.result.createObjectStore("blocks", { keyPath: ["path", "offset", "version"] }).createIndex("version", ["path", "version"]);
      }), c.addEventListener("success", () => {
        s(c.result);
      }), c.addEventListener("error", () => {
        n(c.error);
      });
    });
  }

  const Zs = new Error("request for lock canceled");
  var Gs = function(h, s, n, c) {
    function m(f) {
      return f instanceof n ? f : new n(function(A) {
        A(f);
      });
    }

    return new (n || (n = Promise))(function(f, A) {
      function q(I) {
        try {
          N(c.next(I));
        } catch (L) {
          A(L);
        }
      }

      function F(I) {
        try {
          N(c.throw(I));
        } catch (L) {
          A(L);
        }
      }

      function N(I) {
        I.done ? f(I.value) : m(I.value).then(q, F);
      }

      N((c = c.apply(h, s || [])).next());
    });
  };

  class Js {
    constructor(s, n = Zs) {
      this._value = s, this._cancelError = n, this._weightedQueues = [], this._weightedWaiters = [];
    }

    acquire(s = 1) {
      if (s <= 0) throw new Error(`invalid weight ${s}: must be positive`);
      return new Promise((n, c) => {
        this._weightedQueues[s - 1] || (this._weightedQueues[s - 1] = []), this._weightedQueues[s - 1].push({
          resolve: n,
          reject: c
        }), this._dispatch();
      });
    }

    runExclusive(s, n = 1) {
      return Gs(this, void 0, void 0, function* () {
        const [c, m] = yield this.acquire(n);
        try {
          return yield s(c);
        } finally {
          m();
        }
      });
    }

    waitForUnlock(s = 1) {
      if (s <= 0) throw new Error(`invalid weight ${s}: must be positive`);
      return new Promise(n => {
        this._weightedWaiters[s - 1] || (this._weightedWaiters[s - 1] = []), this._weightedWaiters[s - 1].push(n), this._dispatch();
      });
    }

    isLocked() {
      return this._value <= 0;
    }

    getValue() {
      return this._value;
    }

    setValue(s) {
      this._value = s, this._dispatch();
    }

    release(s = 1) {
      if (s <= 0) throw new Error(`invalid weight ${s}: must be positive`);
      this._value += s, this._dispatch();
    }

    cancel() {
      this._weightedQueues.forEach(s => s.forEach(n => n.reject(this._cancelError))), this._weightedQueues = [];
    }

    _dispatch() {
      var s;
      for (let n = this._value; n > 0; n--) {
        const c = (s = this._weightedQueues[n - 1]) === null || s === void 0 ? void 0 : s.shift();
        if (!c) continue;
        const m = this._value, f = n;
        this._value -= n, n = this._value + 1, c.resolve([m, this._newReleaser(f)]);
      }
      this._drainUnlockWaiters();
    }

    _newReleaser(s) {
      let n = !1;
      return () => {
        n || (n = !0, this.release(s));
      };
    }

    _drainUnlockWaiters() {
      for (let s = this._value; s > 0; s--) this._weightedWaiters[s - 1] && (this._weightedWaiters[s - 1].forEach(n => n()), this._weightedWaiters[s - 1] = []);
    }
  }

  var ei = function(h, s, n, c) {
    function m(f) {
      return f instanceof n ? f : new n(function(A) {
        A(f);
      });
    }

    return new (n || (n = Promise))(function(f, A) {
      function q(I) {
        try {
          N(c.next(I));
        } catch (L) {
          A(L);
        }
      }

      function F(I) {
        try {
          N(c.throw(I));
        } catch (L) {
          A(L);
        }
      }

      function N(I) {
        I.done ? f(I.value) : m(I.value).then(q, F);
      }

      N((c = c.apply(h, s || [])).next());
    });
  };

  class on {
    constructor(s) {
      this._semaphore = new Js(1, s);
    }

    acquire() {
      return ei(this, void 0, void 0, function* () {
        const [, s] = yield this._semaphore.acquire();
        return s;
      });
    }

    runExclusive(s) {
      return this._semaphore.runExclusive(() => s());
    }

    isLocked() {
      return this._semaphore.isLocked();
    }

    waitForUnlock() {
      return this._semaphore.waitForUnlock();
    }

    release() {
      this._semaphore.isLocked() && this._semaphore.release();
    }

    cancel() {
      return this._semaphore.cancel();
    }
  }

  const ti = globalThis.__vlcn_wa_crsqlite_dbg;

  function It(...h) {
    ti && console.log("crsqlite-wasm: ", ...h);
  }

  const ni = /insert\s|update\s|delete\s/, ri = /begin\s|commit\s|rollback\s|savepoint\s/;

  function ct(h, s, n) {
    const c = h.toLowerCase();
    if (ri.exec(c) == null) return ni.exec(c) != null ? (It("received write"), null) : n != null ? c + "|" + s + "|" + n.map(f => f != null ? f.toString() : "null").join("|") : c;
  }

  class si {
    constructor(s, n, c, m, f, A, q) {
      J(this, "originDB");
      J(this, "stmtFinalizer");
      J(this, "cache");
      J(this, "api");
      J(this, "base");
      J(this, "str");
      J(this, "sql");
      J(this, "mode", "o");
      J(this, "finalized", !1);
      J(this, "bindings", []);
      this.originDB = s, this.stmtFinalizer = n, this.cache = c, this.api = m, this.base = f, this.str = A, this.sql = q, n.set(f, this);
    }

    run(s, ...n) {
      return Re(this.cache, ct(this.sql, this.mode, n.length > 0 ? n : this.bindings), () => (n.length > 0 && this.bind(n), this.api.step(this.base).then(() => this.api.reset(this.base))), (s == null ? void 0 : s.__mutex) || this.originDB.__mutex);
    }

    get(s, ...n) {
      return Re(this.cache, ct(this.sql, this.mode, n.length > 0 ? n : this.bindings), async () => {
        n.length > 0 && this.bind(n);
        let c = null, m = this.mode === "o" ? this.api.column_names(this.base) : null;
        if (await this.api.step(this.base) == it) {
          const f = this.api.row(this.base);
          if (m != null) {
            const A = {};
            for (let q = 0; q < m.length; ++q) A[m[q]] = f[q];
            c = A;
          } else c = f;
        }
        return await this.api.reset(this.base), c;
      }, (s == null ? void 0 : s.__mutex) || this.originDB.__mutex);
    }

    all(s, ...n) {
      return Re(this.cache, ct(this.sql, this.mode, n.length > 0 ? n : this.bindings), async () => {
        n.length > 0 && this.bind(n);
        const c = [];
        let m = this.mode === "o" ? this.api.column_names(this.base) : null;
        for (; await this.api.step(this.base) == it;) if (m != null) {
          const f = {};
          for (let A = 0; A < m.length; ++A) f[m[A]] = this.api.column(this.base, A);
          c.push(f);
        } else {
          c.push(this.api.row(this.base));
          continue;
        }
        return await this.api.reset(this.base), c;
      }, (s == null ? void 0 : s.__mutex) || this.originDB.__mutex);
    }

    async* iterate(s, ...n) {
      for (this.bind(n); await Re(this.cache, void 0, () => this.api.step(this.base), (s == null ? void 0 : s.__mutex) || this.originDB.__mutex) == it;) yield this.api.row(this.base);
      await Re(this.cache, void 0, () => this.api.reset(this.base), (s == null ? void 0 : s.__mutex) || this.originDB.__mutex);
    }

    raw(s) {
      return s ? this.mode = "a" : this.mode = "o", this;
    }

    bind(s) {
      this.bindings = s;
      for (let n = 0; n < s.length; ++n) this.api.bind(this.base, n + 1, s[n]);
      return this;
    }

    finalize(s) {
      return Re(this.cache, void 0, () => {
        if (!this.finalized) return this.finalized = !0, this.api.str_finish(this.str), this.stmtFinalizer.delete(this.base), this.api.finalize(this.base);
      }, (s == null ? void 0 : s.__mutex) || this.originDB.__mutex);
    }
  }

  class Ct {
    constructor(s, n, c, m, f) {
      J(this, "api");
      J(this, "db");
      J(this, "__mutex");
      J(this, "assertOpen");
      J(this, "stmtFinalizer");
      J(this, "cache", new Map);
      this.api = s, this.db = n, this.__mutex = c, this.assertOpen = m, this.stmtFinalizer = f;
    }

    execMany(s) {
      return this.assertOpen(), Re(this.cache, null, () => this.api.exec(this.db, s.join("")), this.__mutex);
    }

    exec(s, n) {
      return this.assertOpen(), Re(this.cache, ct(s, "a", n), () => this.statements(s, !1, n), this.__mutex);
    }

    execO(s, n) {
      return this.assertOpen(), Re(this.cache, ct(s, "o", n), () => this.statements(s, !0, n), this.__mutex);
    }

    execA(s, n) {
      return this.assertOpen(), Re(this.cache, ct(s, "a", n), () => this.statements(s, !1, n), this.__mutex);
    }

    prepare(s) {
      return this.assertOpen(), Re(this.cache, void 0, async () => {
        const n = this.api.str_new(this.db, s), c = await this.api.prepare_v2(this.db, this.api.str_value(n));
        if (c == null) throw this.api.str_finish(n), new Error(`Could not prepare ${s}`);
        return new si(this, this.stmtFinalizer, this.cache, this.api, c.stmt, n, s);
      }, this.__mutex);
    }

    tx(s) {
      this.assertOpen();
      const n = "crsql" + crypto.randomUUID().replaceAll("-", "");
      return ii(async c => {
        await c.exec("SAVEPOINT " + n);
        try {
          await s(c);
        } catch (m) {
          throw await c.exec("ROLLBACK TO " + n), await c.exec("RELEASE " + n), m;
        }
        await c.exec("RELEASE " + n);
      }, this.__mutex, this);
    }

    imperativeTx() {
      return this.__mutex.acquire().then(s => {
        const n = new on;
        return [s, new Ct(this.api, this.db, n, this.assertOpen, this.stmtFinalizer)];
      });
    }

    async statements(s, n, c) {
      const m = [], f = this.api.str_new(this.db, s);
      let A = { stmt: null, sql: this.api.str_value(f) };
      try {
        for (; A = await this.api.prepare_v2(this.db, A.sql);) {
          const N = A.stmt, I = [], L = this.api.column_names(N);
          for (c && this.bind(N, c); await this.api.step(N) === it;) {
            const oe = this.api.row(N);
            I.push(oe);
          }
          L.length && m.push({ columns: L, rows: I }), this.api.finalize(A.stmt), A.stmt = null;
        }
      } catch (N) {
        throw console.error(`Failed running ${s}`, N), N;
      } finally {
        A != null && A.stmt && this.api.finalize(A.stmt), this.api.str_finish(f);
      }
      const q = m[0];
      if (q == null) return null;
      if (!n) return q.rows;
      const F = [];
      for (const N of q.rows) {
        const I = {};
        for (let L = 0; L < q.columns.length; ++L) I[q.columns[L]] = N[L];
        F.push(I);
      }
      return F;
    }

    bind(s, n) {
      for (let c = 0; c < n.length; ++c) {
        const m = n[c];
        this.api.bind(s, c + 1, typeof m == "boolean" ? m && 1 || 0 : m);
      }
    }
  }

  const Lt = new on;
  Lt.name = "topLevelMutex";

  function Re(h, s, n, c) {
    if (s === null) It("Cache clear"), h == null || h.clear(); else if (s !== void 0) {
      const f = h == null ? void 0 : h.get(s);
      if (f) return It("Cache hit", s), f;
    }
    It("Enqueueing query ", s);
    const m = c.runExclusive(n);
    return s && (h == null || h.set(s, m), m.finally(() => h == null ? void 0 : h.delete(s)).catch(f => {
      console.error(f);
    })), m;
  }

  function ii(h, s, n) {
    return s.runExclusive(() => {
      const c = new on, m = new Ct(n.api, n.db, c, n.assertOpen, n.stmtFinalizer);
      return h(m);
    });
  }

  function oi(h, s = 0) {
    let n = 3735928559 ^ s, c = 1103547991 ^ s;
    for (let m = 0, f; m < h.length; m++) f = h.charCodeAt(m), n = Math.imul(n ^ f, 2654435761), c = Math.imul(c ^ f, 1597334677);
    return n = Math.imul(n ^ n >>> 16, 2246822507), n ^= Math.imul(c ^ c >>> 13, 3266489909), c = Math.imul(c ^ c >>> 16, 2246822507), c ^= Math.imul(n ^ n >>> 13, 3266489909), 4294967296n * BigInt(c) + BigInt(n);
  }

  function Dn(h) {
    const s = h[0];
    if (s != null) return s[Object.keys(s)[0]];
  }

  class ai {
    constructor(s, n, c) {
      J(this, "api");
      J(this, "db");
      J(this, "filename");
      J(this, "__mutex", Lt);
      J(this, "stmtFinalizer", new Map);
      j(this, ht, null);
      j(this, et, null);
      J(this, "cache", new Map);
      j(this, $e, null);
      j(this, At, !1);
      j(this, Ie, void 0);
      j(this, xt, () => {
        if (b(this, At)) throw new Error("The DB is closed");
      });
      j(this, zt, (s, n, c, m) => {
        b(this, $e) != null && b(this, $e).forEach(f => {
          try {
            f(s, n, c, m);
          } catch (A) {
            console.error("Failed notifying a DB update listener"), console.error(A);
          }
        });
      });
      this.api = s, this.db = n, this.filename = c, Z(this, Ie, new Ct(s, n, Lt, b(this, xt), this.stmtFinalizer));
    }

    get siteid() {
      return b(this, ht);
    }

    _setSiteid(s) {
      if (b(this, ht)) throw new Error("Site id already set");
      Z(this, ht, s);
    }

    _setTablesUsedStmt(s) {
      Z(this, et, s);
    }

    get tablesUsedStmt() {
      if (b(this, et) == null) throw new Error("tablesUsedStmt not set");
      return b(this, et);
    }

    async automigrateTo(s, n) {
      const c = oi(n), m = Dn(await this.execA("SELECT value FROM crsql_master WHERE key = 'schema_name'")),
        f = Dn(await this.execA("SELECT value FROM crsql_master WHERE key = 'schema_version'"));
      if (m === s && BigInt(f || 0) === c) return "noop";
      const A = m === void 0 || m !== s ? "apply" : "migrate";
      return await this.tx(async q => {
        if (f == null || m !== s) {
          if (m !== s) {
            const F = await q.execA("SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%' AND name NOT LIKE 'crsql_%'");
            for (const N of F) await q.exec(`DROP TABLE [${N[0]}]`);
          }
          await q.exec(n);
        } else await q.exec("SELECT crsql_automigrate(?, 'SELECT crsql_finalize();')", [n]);
        await q.exec("INSERT OR REPLACE INTO crsql_master (key, value) VALUES (?, ?)", ["schema_version", c]), await q.exec("INSERT OR REPLACE INTO crsql_master (key, value) VALUES (?, ?)", ["schema_name", s]);
      }), await this.exec("VACUUM;"), A;
    }

    execMany(s) {
      return b(this, Ie).execMany(s);
    }

    exec(s, n) {
      return b(this, Ie).exec(s, n);
    }

    execO(s, n) {
      return b(this, Ie).execO(s, n);
    }

    execA(s, n) {
      return b(this, Ie).execA(s, n);
    }

    prepare(s) {
      return b(this, Ie).prepare(s);
    }

    tx(s) {
      return b(this, Ie).tx(s);
    }

    imperativeTx() {
      return b(this, Ie).imperativeTx();
    }

    async close() {
      var s;
      for (const n of this.stmtFinalizer.values()) await n.finalize(this);
      return (s = b(this, et)) == null || s.finalize(this), this.exec("SELECT crsql_finalize()").then(() => (Z(this, At, !0), Re(this.cache, void 0, () => this.api.close(this.db), this.__mutex)));
    }

    createFunction(s, n, c) {
      b(this, xt).call(this), this.api.create_function(this.db, s, n.length, Ns, 0, (m, f) => {
        const A = [];
        for (let F = 0; F < n.length; ++F) A.push(this.api.value(f[F]));
        const q = n(...A);
        q !== void 0 && this.api.result(m, q);
      });
    }

    onUpdate(s) {
      return b(this, $e) == null && (this.api.update_hook(this.db, b(this, zt)), Z(this, $e, new Set)), b(this, $e).add(s), () => {
        var n;
        return (n = b(this, $e)) == null ? void 0 : n.delete(s);
      };
    }
  }

  ht = new WeakMap, et = new WeakMap, $e = new WeakMap, At = new WeakMap, Ie = new WeakMap, xt = new WeakMap, zt = new WeakMap;
  let Pt = null;

  class ci {
    constructor(s) {
      J(this, "base");
      this.base = s;
    }

    open(s, n = "c") {
      return Re(null, void 0, () => this.base.open_v2(s || ":memory:", rn | Rn | Cs, s != null ? "idb-batch-atomic" : void 0), Lt).then(c => {
        const m = new ai(this.base, c, s || ":memory:");
        return m.prepare(`SELECT tbl_name FROM tables_used(?) AS u
        JOIN sqlite_master ON sqlite_master.name = u.name
        WHERE u.schema = 'main'`).then(f => {
          f.raw(!0), m._setTablesUsedStmt(f);
        }).then(() => m.execA("select quote(crsql_site_id());")).then(f => (m._setSiteid(f[0][0].replace(/'|X/g, "")), m));
      });
    }
  }

  async function ui(h) {
    if (Pt != null) return Pt;
    const s = await te({
      locateFile(c) {
        return h ? h(c) : new URL("crsqlite.wasm", self.location.href).href;
      }
    }), n = Us(s);
    return n.vfs_register(new Xs("idb-batch-atomic", { durability: "relaxed" })), Pt = new ci(n), Pt;
  }

  const li = ie({
    main() {
      fi();
    }
  });

  async function fi() {
    const s = await (await ui()).open("database.db");
    await s.exec("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY NOT NULL, name TEXT)"), await (await s.prepare("INSERT OR IGNORE INTO users (name) VALUES (?)")).run(s, `John Do. Born at ${new Date().toTimeString()}`);
    const c = await s.execA("SELECT * FROM users");
    console.log("Saved users", c);
  }

  var hi = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {},
    mi = { exports: {} };
  (function(h, s) {
    (function(n, c) {
      c(h);
    })(typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : hi, function(n) {
      var c, m;
      if (!((m = (c = globalThis.chrome) == null ? void 0 : c.runtime) != null && m.id)) throw new Error("This script should only be loaded in a browser extension.");
      if (typeof globalThis.browser > "u" || Object.getPrototypeOf(globalThis.browser) !== Object.prototype) {
        const f = "The message port closed before a response was received.", A = q => {
          const F = {
            alarms: {
              clear: { minArgs: 0, maxArgs: 1 },
              clearAll: { minArgs: 0, maxArgs: 0 },
              get: { minArgs: 0, maxArgs: 1 },
              getAll: { minArgs: 0, maxArgs: 0 }
            },
            bookmarks: {
              create: { minArgs: 1, maxArgs: 1 },
              get: { minArgs: 1, maxArgs: 1 },
              getChildren: { minArgs: 1, maxArgs: 1 },
              getRecent: { minArgs: 1, maxArgs: 1 },
              getSubTree: { minArgs: 1, maxArgs: 1 },
              getTree: { minArgs: 0, maxArgs: 0 },
              move: { minArgs: 2, maxArgs: 2 },
              remove: { minArgs: 1, maxArgs: 1 },
              removeTree: { minArgs: 1, maxArgs: 1 },
              search: { minArgs: 1, maxArgs: 1 },
              update: { minArgs: 2, maxArgs: 2 }
            },
            browserAction: {
              disable: { minArgs: 0, maxArgs: 1, fallbackToNoCallback: !0 },
              enable: { minArgs: 0, maxArgs: 1, fallbackToNoCallback: !0 },
              getBadgeBackgroundColor: { minArgs: 1, maxArgs: 1 },
              getBadgeText: { minArgs: 1, maxArgs: 1 },
              getPopup: { minArgs: 1, maxArgs: 1 },
              getTitle: { minArgs: 1, maxArgs: 1 },
              openPopup: { minArgs: 0, maxArgs: 0 },
              setBadgeBackgroundColor: { minArgs: 1, maxArgs: 1, fallbackToNoCallback: !0 },
              setBadgeText: { minArgs: 1, maxArgs: 1, fallbackToNoCallback: !0 },
              setIcon: { minArgs: 1, maxArgs: 1 },
              setPopup: { minArgs: 1, maxArgs: 1, fallbackToNoCallback: !0 },
              setTitle: { minArgs: 1, maxArgs: 1, fallbackToNoCallback: !0 }
            },
            browsingData: {
              remove: { minArgs: 2, maxArgs: 2 },
              removeCache: { minArgs: 1, maxArgs: 1 },
              removeCookies: { minArgs: 1, maxArgs: 1 },
              removeDownloads: { minArgs: 1, maxArgs: 1 },
              removeFormData: { minArgs: 1, maxArgs: 1 },
              removeHistory: { minArgs: 1, maxArgs: 1 },
              removeLocalStorage: { minArgs: 1, maxArgs: 1 },
              removePasswords: { minArgs: 1, maxArgs: 1 },
              removePluginData: { minArgs: 1, maxArgs: 1 },
              settings: { minArgs: 0, maxArgs: 0 }
            },
            commands: { getAll: { minArgs: 0, maxArgs: 0 } },
            contextMenus: {
              remove: { minArgs: 1, maxArgs: 1 },
              removeAll: { minArgs: 0, maxArgs: 0 },
              update: { minArgs: 2, maxArgs: 2 }
            },
            cookies: {
              get: { minArgs: 1, maxArgs: 1 },
              getAll: { minArgs: 1, maxArgs: 1 },
              getAllCookieStores: { minArgs: 0, maxArgs: 0 },
              remove: { minArgs: 1, maxArgs: 1 },
              set: { minArgs: 1, maxArgs: 1 }
            },
            devtools: {
              inspectedWindow: { eval: { minArgs: 1, maxArgs: 2, singleCallbackArg: !1 } },
              panels: {
                create: { minArgs: 3, maxArgs: 3, singleCallbackArg: !0 },
                elements: { createSidebarPane: { minArgs: 1, maxArgs: 1 } }
              }
            },
            downloads: {
              cancel: { minArgs: 1, maxArgs: 1 },
              download: { minArgs: 1, maxArgs: 1 },
              erase: { minArgs: 1, maxArgs: 1 },
              getFileIcon: { minArgs: 1, maxArgs: 2 },
              open: { minArgs: 1, maxArgs: 1, fallbackToNoCallback: !0 },
              pause: { minArgs: 1, maxArgs: 1 },
              removeFile: { minArgs: 1, maxArgs: 1 },
              resume: { minArgs: 1, maxArgs: 1 },
              search: { minArgs: 1, maxArgs: 1 },
              show: { minArgs: 1, maxArgs: 1, fallbackToNoCallback: !0 }
            },
            extension: {
              isAllowedFileSchemeAccess: { minArgs: 0, maxArgs: 0 },
              isAllowedIncognitoAccess: { minArgs: 0, maxArgs: 0 }
            },
            history: {
              addUrl: { minArgs: 1, maxArgs: 1 },
              deleteAll: { minArgs: 0, maxArgs: 0 },
              deleteRange: { minArgs: 1, maxArgs: 1 },
              deleteUrl: { minArgs: 1, maxArgs: 1 },
              getVisits: { minArgs: 1, maxArgs: 1 },
              search: { minArgs: 1, maxArgs: 1 }
            },
            i18n: { detectLanguage: { minArgs: 1, maxArgs: 1 }, getAcceptLanguages: { minArgs: 0, maxArgs: 0 } },
            identity: { launchWebAuthFlow: { minArgs: 1, maxArgs: 1 } },
            idle: { queryState: { minArgs: 1, maxArgs: 1 } },
            management: {
              get: { minArgs: 1, maxArgs: 1 },
              getAll: { minArgs: 0, maxArgs: 0 },
              getSelf: { minArgs: 0, maxArgs: 0 },
              setEnabled: { minArgs: 2, maxArgs: 2 },
              uninstallSelf: { minArgs: 0, maxArgs: 1 }
            },
            notifications: {
              clear: { minArgs: 1, maxArgs: 1 },
              create: { minArgs: 1, maxArgs: 2 },
              getAll: { minArgs: 0, maxArgs: 0 },
              getPermissionLevel: { minArgs: 0, maxArgs: 0 },
              update: { minArgs: 2, maxArgs: 2 }
            },
            pageAction: {
              getPopup: { minArgs: 1, maxArgs: 1 },
              getTitle: { minArgs: 1, maxArgs: 1 },
              hide: { minArgs: 1, maxArgs: 1, fallbackToNoCallback: !0 },
              setIcon: { minArgs: 1, maxArgs: 1 },
              setPopup: { minArgs: 1, maxArgs: 1, fallbackToNoCallback: !0 },
              setTitle: { minArgs: 1, maxArgs: 1, fallbackToNoCallback: !0 },
              show: { minArgs: 1, maxArgs: 1, fallbackToNoCallback: !0 }
            },
            permissions: {
              contains: { minArgs: 1, maxArgs: 1 },
              getAll: { minArgs: 0, maxArgs: 0 },
              remove: { minArgs: 1, maxArgs: 1 },
              request: { minArgs: 1, maxArgs: 1 }
            },
            runtime: {
              getBackgroundPage: { minArgs: 0, maxArgs: 0 },
              getPlatformInfo: { minArgs: 0, maxArgs: 0 },
              openOptionsPage: { minArgs: 0, maxArgs: 0 },
              requestUpdateCheck: { minArgs: 0, maxArgs: 0 },
              sendMessage: { minArgs: 1, maxArgs: 3 },
              sendNativeMessage: { minArgs: 2, maxArgs: 2 },
              setUninstallURL: { minArgs: 1, maxArgs: 1 }
            },
            sessions: {
              getDevices: { minArgs: 0, maxArgs: 1 },
              getRecentlyClosed: { minArgs: 0, maxArgs: 1 },
              restore: { minArgs: 0, maxArgs: 1 }
            },
            storage: {
              local: {
                clear: { minArgs: 0, maxArgs: 0 },
                get: { minArgs: 0, maxArgs: 1 },
                getBytesInUse: { minArgs: 0, maxArgs: 1 },
                remove: { minArgs: 1, maxArgs: 1 },
                set: { minArgs: 1, maxArgs: 1 }
              },
              managed: { get: { minArgs: 0, maxArgs: 1 }, getBytesInUse: { minArgs: 0, maxArgs: 1 } },
              sync: {
                clear: { minArgs: 0, maxArgs: 0 },
                get: { minArgs: 0, maxArgs: 1 },
                getBytesInUse: { minArgs: 0, maxArgs: 1 },
                remove: { minArgs: 1, maxArgs: 1 },
                set: { minArgs: 1, maxArgs: 1 }
              }
            },
            tabs: {
              captureVisibleTab: { minArgs: 0, maxArgs: 2 },
              create: { minArgs: 1, maxArgs: 1 },
              detectLanguage: { minArgs: 0, maxArgs: 1 },
              discard: { minArgs: 0, maxArgs: 1 },
              duplicate: { minArgs: 1, maxArgs: 1 },
              executeScript: { minArgs: 1, maxArgs: 2 },
              get: { minArgs: 1, maxArgs: 1 },
              getCurrent: { minArgs: 0, maxArgs: 0 },
              getZoom: { minArgs: 0, maxArgs: 1 },
              getZoomSettings: { minArgs: 0, maxArgs: 1 },
              goBack: { minArgs: 0, maxArgs: 1 },
              goForward: { minArgs: 0, maxArgs: 1 },
              highlight: { minArgs: 1, maxArgs: 1 },
              insertCSS: { minArgs: 1, maxArgs: 2 },
              move: { minArgs: 2, maxArgs: 2 },
              query: { minArgs: 1, maxArgs: 1 },
              reload: { minArgs: 0, maxArgs: 2 },
              remove: { minArgs: 1, maxArgs: 1 },
              removeCSS: { minArgs: 1, maxArgs: 2 },
              sendMessage: { minArgs: 2, maxArgs: 3 },
              setZoom: { minArgs: 1, maxArgs: 2 },
              setZoomSettings: { minArgs: 1, maxArgs: 2 },
              update: { minArgs: 1, maxArgs: 2 }
            },
            topSites: { get: { minArgs: 0, maxArgs: 0 } },
            webNavigation: { getAllFrames: { minArgs: 1, maxArgs: 1 }, getFrame: { minArgs: 1, maxArgs: 1 } },
            webRequest: { handlerBehaviorChanged: { minArgs: 0, maxArgs: 0 } },
            windows: {
              create: { minArgs: 0, maxArgs: 1 },
              get: { minArgs: 1, maxArgs: 2 },
              getAll: { minArgs: 0, maxArgs: 1 },
              getCurrent: { minArgs: 0, maxArgs: 1 },
              getLastFocused: { minArgs: 0, maxArgs: 1 },
              remove: { minArgs: 1, maxArgs: 1 },
              update: { minArgs: 2, maxArgs: 2 }
            }
          };
          if (Object.keys(F).length === 0) throw new Error("api-metadata.json has not been included in browser-polyfill");

          class N extends WeakMap {
            constructor(O, W = void 0) {
              super(W), this.createItem = O;
            }

            get(O) {
              return this.has(O) || this.set(O, this.createItem(O)), super.get(O);
            }
          }

          const I = P => P && typeof P == "object" && typeof P.then == "function", L = (P, O) => (...W) => {
            q.runtime.lastError ? P.reject(new Error(q.runtime.lastError.message)) : O.singleCallbackArg || W.length <= 1 && O.singleCallbackArg !== !1 ? P.resolve(W[0]) : P.resolve(W);
          }, oe = P => P == 1 ? "argument" : "arguments", re = (P, O) => function(X, ...ce) {
            if (ce.length < O.minArgs) throw new Error(`Expected at least ${O.minArgs} ${oe(O.minArgs)} for ${P}(), got ${ce.length}`);
            if (ce.length > O.maxArgs) throw new Error(`Expected at most ${O.maxArgs} ${oe(O.maxArgs)} for ${P}(), got ${ce.length}`);
            return new Promise((be, ye) => {
              if (O.fallbackToNoCallback) try {
                X[P](...ce, L({ resolve: be, reject: ye }, O));
              } catch (B) {
                console.warn(`${P} API method doesn't seem to support the callback parameter, falling back to call it without a callback: `, B), X[P](...ce), O.fallbackToNoCallback = !1, O.noCallback = !0, be();
              } else O.noCallback ? (X[P](...ce), be()) : X[P](...ce, L({ resolve: be, reject: ye }, O));
            });
          }, V = (P, O, W) => new Proxy(O, {
            apply(X, ce, be) {
              return W.call(ce, P, ...be);
            }
          });
          let l = Function.call.bind(Object.prototype.hasOwnProperty);
          const u = (P, O = {}, W = {}) => {
              let X = Object.create(null), ce = {
                has(ye, B) {
                  return B in P || B in X;
                }, get(ye, B, ve) {
                  if (B in X) return X[B];
                  if (!(B in P)) return;
                  let G = P[B];
                  if (typeof G == "function") if (typeof O[B] == "function") G = V(P, P[B], O[B]); else if (l(W, B)) {
                    let qe = re(B, W[B]);
                    G = V(P, P[B], qe);
                  } else G = G.bind(P); else if (typeof G == "object" && G !== null && (l(O, B) || l(W, B))) G = u(G, O[B], W[B]); else if (l(W, "*")) G = u(G, O[B], W["*"]); else return Object.defineProperty(X, B, {
                    configurable: !0,
                    enumerable: !0,
                    get() {
                      return P[B];
                    },
                    set(qe) {
                      P[B] = qe;
                    }
                  }), G;
                  return X[B] = G, G;
                }, set(ye, B, ve, G) {
                  return B in X ? X[B] = ve : P[B] = ve, !0;
                }, defineProperty(ye, B, ve) {
                  return Reflect.defineProperty(X, B, ve);
                }, deleteProperty(ye, B) {
                  return Reflect.deleteProperty(X, B);
                }
              }, be = Object.create(P);
              return new Proxy(be, ce);
            }, a = P => ({
              addListener(O, W, ...X) {
                O.addListener(P.get(W), ...X);
              }, hasListener(O, W) {
                return O.hasListener(P.get(W));
              }, removeListener(O, W) {
                O.removeListener(P.get(W));
              }
            }), _ = new N(P => typeof P != "function" ? P : function(W) {
              const X = u(W, {}, { getContent: { minArgs: 0, maxArgs: 0 } });
              P(X);
            }), y = new N(P => typeof P != "function" ? P : function(W, X, ce) {
              let be = !1, ye, B = new Promise(he => {
                ye = function(Te) {
                  be = !0, he(Te);
                };
              }), ve;
              try {
                ve = P(W, X, ye);
              } catch (he) {
                ve = Promise.reject(he);
              }
              const G = ve !== !0 && I(ve);
              if (ve !== !0 && !G && !be) return !1;
              const qe = he => {
                he.then(Te => {
                  ce(Te);
                }, Te => {
                  let Ce;
                  Te && (Te instanceof Error || typeof Te.message == "string") ? Ce = Te.message : Ce = "An unexpected error occurred", ce({
                    __mozWebExtensionPolyfillReject__: !0,
                    message: Ce
                  });
                }).catch(Te => {
                  console.error("Failed to send onMessage rejected reply", Te);
                });
              };
              return qe(G ? ve : B), !0;
            }), E = ({ reject: P, resolve: O }, W) => {
              q.runtime.lastError ? q.runtime.lastError.message === f ? O() : P(new Error(q.runtime.lastError.message)) : W && W.__mozWebExtensionPolyfillReject__ ? P(new Error(W.message)) : O(W);
            }, K = (P, O, W, ...X) => {
              if (X.length < O.minArgs) throw new Error(`Expected at least ${O.minArgs} ${oe(O.minArgs)} for ${P}(), got ${X.length}`);
              if (X.length > O.maxArgs) throw new Error(`Expected at most ${O.maxArgs} ${oe(O.maxArgs)} for ${P}(), got ${X.length}`);
              return new Promise((ce, be) => {
                const ye = E.bind(null, { resolve: ce, reject: be });
                X.push(ye), W.sendMessage(...X);
              });
            }, C = {
              devtools: { network: { onRequestFinished: a(_) } },
              runtime: {
                onMessage: a(y),
                onMessageExternal: a(y),
                sendMessage: K.bind(null, "sendMessage", { minArgs: 1, maxArgs: 3 })
              },
              tabs: { sendMessage: K.bind(null, "sendMessage", { minArgs: 2, maxArgs: 3 }) }
            },
            Q = { clear: { minArgs: 1, maxArgs: 1 }, get: { minArgs: 1, maxArgs: 1 }, set: { minArgs: 1, maxArgs: 1 } };
          return F.privacy = { network: { "*": Q }, services: { "*": Q }, websites: { "*": Q } }, u(q, C, F);
        };
        n.exports = A(chrome);
      } else n.exports = globalThis.browser;
    });
  })(mi);

  function Ft(h, ...s) {
  }

  var di = {
    debug: (...h) => Ft(console.debug, ...h),
    log: (...h) => Ft(console.log, ...h),
    warn: (...h) => Ft(console.warn, ...h),
    error: (...h) => Ft(console.error, ...h)
  };
  try {
    li.main() instanceof Promise && console.warn("The background's main() function return a promise, but it must be synchonous");
  } catch (h) {
    throw di.error("The background crashed on startup!"), h;
  }
})();
