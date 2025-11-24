module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/src/app/layout.jsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/layout.jsx [app-rsc] (ecmascript)"));
}),
"[project]/src/app/item/[id]/page.jsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ItemPage,
    "generateStaticParams",
    ()=>generateStaticParams
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '../../../components/Scene'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
;
// We need the same images array here so the 3D scene knows what to render
const images = [
    {
        position: [
            0,
            0,
            1.5
        ],
        rotation: [
            0,
            0,
            0
        ],
        url: "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
    },
    {
        position: [
            -0.8,
            0,
            -0.6
        ],
        rotation: [
            0,
            0,
            0
        ],
        url: "https://images.pexels.com/photos/416430/pexels-photo-416430.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
    },
    {
        position: [
            0.8,
            0,
            -0.6
        ],
        rotation: [
            0,
            0,
            0
        ],
        url: "https://images.pexels.com/photos/310452/pexels-photo-310452.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
    },
    {
        position: [
            -1.75,
            0,
            0.25
        ],
        rotation: [
            0,
            Math.PI / 2.5,
            0
        ],
        url: "https://images.pexels.com/photos/327482/pexels-photo-327482.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
    },
    {
        position: [
            -2.15,
            0,
            1.5
        ],
        rotation: [
            0,
            Math.PI / 2.5,
            0
        ],
        url: "https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
    },
    {
        position: [
            -2,
            0,
            2.75
        ],
        rotation: [
            0,
            Math.PI / 2.5,
            0
        ],
        url: "https://images.pexels.com/photos/358574/pexels-photo-358574.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
    },
    {
        position: [
            1.75,
            0,
            0.25
        ],
        rotation: [
            0,
            -Math.PI / 2.5,
            0
        ],
        url: "https://images.pexels.com/photos/227675/pexels-photo-227675.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
    },
    {
        position: [
            2.15,
            0,
            1.5
        ],
        rotation: [
            0,
            -Math.PI / 2.5,
            0
        ],
        url: "https://images.pexels.com/photos/911738/pexels-photo-911738.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
    },
    {
        position: [
            2,
            0,
            2.75
        ],
        rotation: [
            0,
            -Math.PI / 2.5,
            0
        ],
        url: "https://images.pexels.com/photos/1738986/pexels-photo-1738986.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
    }
];
async function generateStaticParams() {
    return [];
}
async function ItemPage({ params }) {
    // In Next.js 15, params is a promise you must await
    const { id } = await params;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full h-full",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(Scene, {
            images: images,
            activeId: id,
            basePath: "/gallery"
        }, void 0, false, {
            fileName: "[project]/src/app/item/[id]/page.jsx",
            lineNumber: 28,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/item/[id]/page.jsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/app/item/[id]/page.jsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/item/[id]/page.jsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__fc438a67._.js.map