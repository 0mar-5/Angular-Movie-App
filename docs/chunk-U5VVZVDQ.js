import{F as C,Y as F,_ as A}from"./chunk-CNRG4DXS.js";import{Db as I,Eb as x,Q as g,Xb as D,Ya as m,a as y,ab as h,pa as d,tc as E}from"./chunk-OPX47V4V.js";var O=class a{static isArray(t,e=!0){return Array.isArray(t)&&(e||t.length!==0)}static isObject(t,e=!0){return typeof t=="object"&&!Array.isArray(t)&&t!=null&&(e||Object.keys(t).length!==0)}static equals(t,e,r){return r?this.resolveFieldData(t,r)===this.resolveFieldData(e,r):this.equalsByValue(t,e)}static equalsByValue(t,e){if(t===e)return!0;if(t&&e&&typeof t=="object"&&typeof e=="object"){var r=Array.isArray(t),s=Array.isArray(e),n,i,f;if(r&&s){if(i=t.length,i!=e.length)return!1;for(n=i;n--!==0;)if(!this.equalsByValue(t[n],e[n]))return!1;return!0}if(r!=s)return!1;var c=this.isDate(t),o=this.isDate(e);if(c!=o)return!1;if(c&&o)return t.getTime()==e.getTime();var u=t instanceof RegExp,p=e instanceof RegExp;if(u!=p)return!1;if(u&&p)return t.toString()==e.toString();var l=Object.keys(t);if(i=l.length,i!==Object.keys(e).length)return!1;for(n=i;n--!==0;)if(!Object.prototype.hasOwnProperty.call(e,l[n]))return!1;for(n=i;n--!==0;)if(f=l[n],!this.equalsByValue(t[f],e[f]))return!1;return!0}return t!==t&&e!==e}static resolveFieldData(t,e){if(t&&e){if(this.isFunction(e))return e(t);if(e.indexOf(".")==-1)return t[e];{let r=e.split("."),s=t;for(let n=0,i=r.length;n<i;++n){if(s==null)return null;s=s[r[n]]}return s}}else return null}static isFunction(t){return!!(t&&t.constructor&&t.call&&t.apply)}static reorderArray(t,e,r){let s;t&&e!==r&&(r>=t.length&&(r%=t.length,e%=t.length),t.splice(r,0,t.splice(e,1)[0]))}static insertIntoOrderedArray(t,e,r,s){if(r.length>0){let n=!1;for(let i=0;i<r.length;i++)if(this.findIndexInList(r[i],s)>e){r.splice(i,0,t),n=!0;break}n||r.push(t)}else r.push(t)}static findIndexInList(t,e){let r=-1;if(e){for(let s=0;s<e.length;s++)if(e[s]==t){r=s;break}}return r}static contains(t,e){if(t!=null&&e&&e.length){for(let r of e)if(this.equals(t,r))return!0}return!1}static removeAccents(t){return t&&(t=t.normalize("NFKD").replace(new RegExp("\\p{Diacritic}","gu"),"")),t}static isDate(t){return Object.prototype.toString.call(t)==="[object Date]"}static isEmpty(t){return t==null||t===""||Array.isArray(t)&&t.length===0||!this.isDate(t)&&typeof t=="object"&&Object.keys(t).length===0}static isNotEmpty(t){return!this.isEmpty(t)}static compare(t,e,r,s=1){let n=-1,i=this.isEmpty(t),f=this.isEmpty(e);return i&&f?n=0:i?n=s:f?n=-s:typeof t=="string"&&typeof e=="string"?n=t.localeCompare(e,r,{numeric:!0}):n=t<e?-1:t>e?1:0,n}static sort(t,e,r=1,s,n=1){let i=a.compare(t,e,s,r),f=r;return(a.isEmpty(t)||a.isEmpty(e))&&(f=n===1?r:n),f*i}static merge(t,e){if(!(t==null&&e==null)){{if((t==null||typeof t=="object")&&(e==null||typeof e=="object"))return y(y({},t||{}),e||{});if((t==null||typeof t=="string")&&(e==null||typeof e=="string"))return[t||"",e||""].join(" ")}return e||t}}static isPrintableCharacter(t=""){return this.isNotEmpty(t)&&t.length===1&&t.match(/\S| /)}static getItemValue(t,...e){return this.isFunction(t)?t(...e):t}static findLastIndex(t,e){let r=-1;if(this.isNotEmpty(t))try{r=t.findLastIndex(e)}catch{r=t.lastIndexOf([...t].reverse().find(e))}return r}static findLast(t,e){let r;if(this.isNotEmpty(t))try{r=t.findLast(e)}catch{r=[...t].reverse().find(e)}return r}static deepEquals(t,e){if(t===e)return!0;if(t&&e&&typeof t=="object"&&typeof e=="object"){var r=Array.isArray(t),s=Array.isArray(e),n,i,f;if(r&&s){if(i=t.length,i!=e.length)return!1;for(n=i;n--!==0;)if(!this.deepEquals(t[n],e[n]))return!1;return!0}if(r!=s)return!1;var c=t instanceof Date,o=e instanceof Date;if(c!=o)return!1;if(c&&o)return t.getTime()==e.getTime();var u=t instanceof RegExp,p=e instanceof RegExp;if(u!=p)return!1;if(u&&p)return t.toString()==e.toString();var l=Object.keys(t);if(i=l.length,i!==Object.keys(e).length)return!1;for(n=i;n--!==0;)if(!Object.prototype.hasOwnProperty.call(e,l[n]))return!1;for(n=i;n--!==0;)if(f=l[n],!this.deepEquals(t[f],e[f]))return!1;return!0}return t!==t&&e!==e}static minifyCSS(t){return t&&t.replace(/\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g,"").replace(/ {2,}/g," ").replace(/ ([{:}]) /g,"$1").replace(/([;,]) /g,"$1").replace(/ !/g,"!").replace(/: /g,":")}static toFlatCase(t){return this.isString(t)?t.replace(/(-|_)/g,"").toLowerCase():t}static isString(t,e=!0){return typeof t=="string"&&(e||t!=="")}};function S(){let a=[],t=(n,i)=>{let f=a.length>0?a[a.length-1]:{key:n,value:i},c=f.value+(f.key===n?0:i)+2;return a.push({key:n,value:c}),c},e=n=>{a=a.filter(i=>i.value!==n)},r=()=>a.length>0?a[a.length-1].value:0,s=n=>n&&parseInt(n.style.zIndex,10)||0;return{get:s,set:(n,i,f)=>{i&&(i.style.zIndex=String(t(n,f)))},clear:n=>{n&&(e(s(n)),n.style.zIndex="")},getCurrent:()=>r(),generateZIndex:t,revertZIndex:e}}var V=S(),k=a=>!!a;var w=["*"],q=`
.p-icon {
    display: inline-block;
    vertical-align: baseline;
}

.p-icon-spin {
    -webkit-animation: p-icon-spin 2s infinite linear;
    animation: p-icon-spin 2s infinite linear;
}

@-webkit-keyframes p-icon-spin {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(359deg);
        transform: rotate(359deg);
    }
}

@keyframes p-icon-spin {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(359deg);
        transform: rotate(359deg);
    }
}
`,L=(()=>{class a extends F{name="baseicon";inlineStyles=q;static \u0275fac=(()=>{let e;return function(s){return(e||(e=d(a)))(s||a)}})();static \u0275prov=g({token:a,factory:a.\u0275fac})}return a})();var K=(()=>{class a extends A{label;spin=!1;styleClass;role;ariaLabel;ariaHidden;ngOnInit(){super.ngOnInit(),this.getAttributes()}getAttributes(){let e=C(this.label);this.role=e?void 0:"img",this.ariaLabel=e?void 0:this.label,this.ariaHidden=e}getClassNames(){return`p-icon ${this.styleClass?this.styleClass+" ":""}${this.spin?"p-icon-spin":""}`}static \u0275fac=(()=>{let e;return function(s){return(e||(e=d(a)))(s||a)}})();static \u0275cmp=m({type:a,selectors:[["ng-component"]],hostAttrs:[1,"p-component","p-iconwrapper"],inputs:{label:"label",spin:[2,"spin","spin",E],styleClass:"styleClass"},features:[D([L]),h],ngContentSelectors:w,decls:1,vars:0,template:function(r,s){r&1&&(I(),x(0))},encapsulation:2,changeDetection:0})}return a})();export{K as a,O as b,V as c,k as d};
