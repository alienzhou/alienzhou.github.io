(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{275:function(t,r,_){t.exports=_.p+"assets/img/break.77195f46.jpg"},313:function(t,r,_){"use strict";_.r(r);var v=_(22),a=Object(v.a)({},function(){var t=this,r=t.$createElement,v=t._self._c||r;return v("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[v("h1",{attrs:{id:"五、页面静态资源"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#五、页面静态资源","aria-hidden":"true"}},[t._v("#")]),t._v(" 五、页面静态资源")]),t._v(" "),v("p",[v("router-link",{attrs:{to:"/4-parse/"}},[t._v("🔙 上一站 - 页面解析与处理")])],1),t._v(" "),v("p",[t._v("在旅程的上一站中，我们介绍了基本的页面解析机制，通过对资源加载顺序和脚本加载的控制，避免了无谓的阻塞，优化了解析性能。")]),t._v(" "),v("p",[t._v("也正如上一站中所说，这时浏览器除了解析页面 DOM 外，还会对页面包含的静态资源发起请求，请求回来后会执行或使用资源。这一站咱们就来具体看看这个阶段。")]),t._v(" "),v("p",[t._v("首先还是从宏观上来了解一下：")]),t._v(" "),v("h2",{attrs:{id:"_1-总体原则"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_1-总体原则","aria-hidden":"true"}},[t._v("#")]),t._v(" 1. 总体原则")]),t._v(" "),v("p",[t._v("这一部分会涉及到各类常见的静态资源：JavaScript 脚本、CSS 样式表、图片、字体等。不同资源的优化措施既有联系又有差别，后续会以各类资源为维度，针对性介绍其优化的关注点和手段。")]),t._v(" "),v("p",[t._v("但咱们还是要先从整体维度上进行一些分析。其实在总体原则上，各类资源的优化思路都是大体类似的，包括但不限于：")]),t._v(" "),v("ul",[v("li",[t._v("减少不必要的请求")]),t._v(" "),v("li",[t._v("减少包体大小")]),t._v(" "),v("li",[t._v("降低应用资源时的消耗")]),t._v(" "),v("li",[t._v("利用缓存")])]),t._v(" "),v("p",[t._v("为了大家能更好理解各类优化实施策略从何而来，先初步扩展一下以上的思路。")]),t._v(" "),v("h3",{attrs:{id:"_1-1-减少不必要的请求"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_1-1-减少不必要的请求","aria-hidden":"true"}},[t._v("#")]),t._v(" 1.1. 减少不必要的请求")]),t._v(" "),v("p",[t._v("核心是希望能够减少请求的数量，因为浏览器对同源请求有并发上限的限制（例如 Chrome 是6），所以在 HTTP/1.1 下，请求过多可能会导致请求被排队了。一个典型场景就是一些图库类型的网站，页面加载后可能需要请求十数张图片。")]),t._v(" "),v("p",[t._v("同时，TCP/IP 的拥塞控制也使其传输有慢启动（slow start）的特点，连接刚建立时包体传输速率较低，后续会渐渐提速。因此，发送过多的“小”请求可能也不是一个很好的做法。")]),t._v(" "),v("p",[t._v("减少不必要的请求主要分为几个维度：")]),t._v(" "),v("ul",[v("li",[t._v("对于不需要使用的内容，其实不需要请求，否则相当于做了无用功；")]),t._v(" "),v("li",[t._v("对于可以延迟加载的内容，不必要现在就立刻加载，最好就在需要使用之前再加载；")]),t._v(" "),v("li",[t._v("对于可以合并的资源，进行资源合并也是一种方法。")])]),t._v(" "),v("h3",{attrs:{id:"_1-2-减少包体大小"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-减少包体大小","aria-hidden":"true"}},[t._v("#")]),t._v(" 1.2. 减少包体大小")]),t._v(" "),v("p",[t._v("包体大小对性能也是有直接影响的。显然同样速率下，包体越小，传输耗时越低，整体页面加载与渲染的性能也会更好。")]),t._v(" "),v("p",[t._v("减少包体大小常用的方式包括了：")]),t._v(" "),v("ul",[v("li",[t._v("使用适合当前资源的压缩技术；")]),t._v(" "),v("li",[t._v("避免再响应包体里“塞入”一些不需要的内容。")])]),t._v(" "),v("h3",{attrs:{id:"_1-3-降低应用资源时的消耗"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_1-3-降低应用资源时的消耗","aria-hidden":"true"}},[t._v("#")]),t._v(" 1.3. 降低应用资源时的消耗")]),t._v(" "),v("p",[t._v("以上主要的关注点都在页面资源加载的效率，其实有些时候，浏览器去执行或使用资源的也是有消耗的。例如在 JavaScript 执行了一段 CPU 密集的计算，或者进行频繁的 DOM 操作，这些都会让 JavaScript 的执行变成影响性能的一大问题。虽然今天的像 V8 这样的引擎已经很快了，但是一些不当的操作仍然会带来性能的损耗。")]),t._v(" "),v("p",[t._v("此外，像是 CSS 选择器匹配、图片的解析与处理等，都是要消耗 CPU 和内存的。也许这些不太常成为性能杀手，但是某些特性场合下，了解它们也许会对你有所帮助。")]),t._v(" "),v("h3",{attrs:{id:"_1-4-利用缓存"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_1-4-利用缓存","aria-hidden":"true"}},[t._v("#")]),t._v(" 1.4. 利用缓存")]),t._v(" "),v("p",[t._v("还记得咱们这趟旅程从哪出发的么？没错，缓存。")]),t._v(" "),v("p",[t._v("在旅程的第一站，我们介绍了浏览器访问一个 url 时的多级缓存策略。千万不要忘了，这些静态子资源也是网络请求，它们仍然可以利用之前介绍的完整缓存流程。缓存在很多时候会是一个帮你解决性能问题的非常有效的手段。")]),t._v(" "),v("p",[t._v("由于第一站已经对缓存进行了详细介绍，所以缓存这部分，在这一站里只会在针对资源类型再补充一些内容。")]),t._v(" "),v("h2",{attrs:{id:"_2-针对各类资源的性能优化-🚀"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_2-针对各类资源的性能优化-🚀","aria-hidden":"true"}},[t._v("#")]),t._v(" 2. 针对各类资源的性能优化 🚀")]),t._v(" "),v("p",[t._v("以上的原则可以指导我们针对性地优化各类资源。下面我就以资源类型为维度，详细介绍其中涉及到的优化点与优化措施。")]),t._v(" "),v("blockquote",[v("p",[t._v("如果你一口气读到这里，可能有些累了。不如先伸个懒腰放松下，整理回忆一下之前的内容。")])]),t._v(" "),v("p",[t._v("如果准备好了，咱们就继续出发吧👇")]),t._v(" "),v("ul",[v("li",[v("router-link",{attrs:{to:"/5-subresources/javascript.html"}},[t._v("JavaScript 优化")])],1),t._v(" "),v("li",[v("router-link",{attrs:{to:"/5-subresources/css.html"}},[t._v("CSS 优化")])],1),t._v(" "),v("li",[v("router-link",{attrs:{to:"/5-subresources/image.html"}},[t._v("图片优化")])],1),t._v(" "),v("li",[v("router-link",{attrs:{to:"/5-subresources/font.html"}},[t._v("字体优化")])],1),t._v(" "),v("li",[v("router-link",{attrs:{to:"/5-subresources/video.html"}},[t._v("视频优化")])],1)]),t._v(" "),v("p",[v("img",{attrs:{src:_(275),alt:"break"}})]),t._v(" "),v("hr"),t._v(" "),v("h2",{attrs:{id:"本节告一段落"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#本节告一段落","aria-hidden":"true"}},[t._v("#")]),t._v(" 本节告一段落")]),t._v(" "),v("p",[t._v("好了，如果你已经阅读完了上面各类资源的具体优化措施，那么恭喜，你已经在「前端性能优化之旅」上行过大半。下面我们会收拾行装继续回到主路上。")]),t._v(" "),v("p",[t._v("下一站我们会来到“运行时”（runtime），看看有哪些性能优化的注意点与技术手段。")]),t._v(" "),v("p",[v("router-link",{attrs:{to:"/6-runtime/"}},[t._v("下一站 - 运行时 🔜")])],1),t._v(" "),v("hr")])},[],!1,null,null,null);r.default=a.exports}}]);