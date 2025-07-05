import{f as I}from"./chunk-VNXYWDFC.js";import{b as D,e as w,h as M,oa as m,sa as F,ua as S}from"./chunk-CE7CS4CG.js";import{Mb as C,Na as f,Pb as k,Q as g,R as u,V as y,Xb as b,Ya as p,Za as h,ab as l,ba as a,mb as s,pa as o,rb as v,sb as i,tb as c,ub as d}from"./chunk-OPX47V4V.js";var j=({dt:e})=>`
.p-progressspinner {
    position: relative;
    margin: 0 auto;
    width: 100px;
    height: 100px;
    display: inline-block;
}

.p-progressspinner::before {
    content: "";
    display: block;
    padding-top: 100%;
}

.p-progressspinner-spin {
    height: 100%;
    transform-origin: center center;
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    animation: p-progressspinner-rotate 2s linear infinite;
}

.p-progressspinner-circle {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: 0;
    stroke: ${e("progressspinner.colorOne")};
    animation: p-progressspinner-dash 1.5s ease-in-out infinite, p-progressspinner-color 6s ease-in-out infinite;
    stroke-linecap: round;
}

@keyframes p-progressspinner-rotate {
    100% {
        transform: rotate(360deg);
    }
}
@keyframes p-progressspinner-dash {
    0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
    }
    50% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -35px;
    }
    100% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -124px;
    }
}
@keyframes p-progressspinner-color {
    100%,
    0% {
        stroke: ${e("progressspinner.colorOne")};
    }
    40% {
        stroke: ${e("progressspinner.colorTwo")};
    }
    66% {
        stroke: ${e("progressspinner.colorThree")};
    }
    80%,
    90% {
        stroke: ${e("progressspinner.colorFour")};
    }
}
`,x={root:"p-progressspinner",spin:"p-progressspinner-spin",circle:"p-progressspinner-circle"},L=(()=>{class e extends F{name="progressspinner";theme=j;classes=x;static \u0275fac=(()=>{let t;return function(r){return(t||(t=o(e)))(r||e)}})();static \u0275prov=g({token:e,factory:e.\u0275fac})}return e})();var N=(()=>{class e extends S{styleClass;style;strokeWidth="2";fill="none";animationDuration="2s";ariaLabel;_componentStyle=y(L);static \u0275fac=(()=>{let t;return function(r){return(t||(t=o(e)))(r||e)}})();static \u0275cmp=p({type:e,selectors:[["p-progressSpinner"],["p-progress-spinner"],["p-progressspinner"]],inputs:{styleClass:"styleClass",style:"style",strokeWidth:"strokeWidth",fill:"fill",animationDuration:"animationDuration",ariaLabel:"ariaLabel"},features:[b([L]),l],decls:3,vars:11,consts:[["role","progressbar",1,"p-progressspinner",3,"ngStyle","ngClass"],["viewBox","25 25 50 50",1,"p-progressspinner-spin"],["cx","50","cy","50","r","20","stroke-miterlimit","10",1,"p-progressspinner-circle"]],template:function(n,r){n&1&&(i(0,"div",0),a(),i(1,"svg",1),d(2,"circle",2),c()()),n&2&&(v("ngStyle",r.style)("ngClass",r.styleClass),s("aria-label",r.ariaLabel)("aria-busy",!0)("data-pc-name","progressspinner")("data-pc-section","root"),f(),C("animation-duration",r.animationDuration),s("data-pc-section","root"),f(),s("fill",r.fill)("stroke-width",r.strokeWidth))},dependencies:[M,D,w,m],encapsulation:2,changeDetection:0})}return e})(),A=(()=>{class e{static \u0275fac=function(n){return new(n||e)};static \u0275mod=h({type:e});static \u0275inj=u({imports:[N,m,m]})}return e})();var Q=(()=>{class e extends I{static \u0275fac=(()=>{let t;return function(r){return(t||(t=o(e)))(r||e)}})();static \u0275cmp=p({type:e,selectors:[["ChevronDownIcon"]],features:[l],decls:2,vars:5,consts:[["width","14","height","14","viewBox","0 0 14 14","fill","none","xmlns","http://www.w3.org/2000/svg"],["d","M7.01744 10.398C6.91269 10.3985 6.8089 10.378 6.71215 10.3379C6.61541 10.2977 6.52766 10.2386 6.45405 10.1641L1.13907 4.84913C1.03306 4.69404 0.985221 4.5065 1.00399 4.31958C1.02276 4.13266 1.10693 3.95838 1.24166 3.82747C1.37639 3.69655 1.55301 3.61742 1.74039 3.60402C1.92777 3.59062 2.11386 3.64382 2.26584 3.75424L7.01744 8.47394L11.769 3.75424C11.9189 3.65709 12.097 3.61306 12.2748 3.62921C12.4527 3.64535 12.6199 3.72073 12.7498 3.84328C12.8797 3.96582 12.9647 4.12842 12.9912 4.30502C13.0177 4.48162 12.9841 4.662 12.8958 4.81724L7.58083 10.1322C7.50996 10.2125 7.42344 10.2775 7.32656 10.3232C7.22968 10.3689 7.12449 10.3944 7.01744 10.398Z","fill","currentColor"]],template:function(n,r){n&1&&(a(),i(0,"svg",0),d(1,"path",1),c()),n&2&&(k(r.getClassNames()),s("aria-label",r.ariaLabel)("aria-hidden",r.ariaHidden)("role",r.role))},encapsulation:2})}return e})();export{Q as a,N as b,A as c};
