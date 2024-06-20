// import type { NextRequest } from "next/server";
// import { NextResponse } from "next/server";
// import {
// 	getStoredUser,
// 	USER_DATA_LOCALSTORAGE_KEY,
// 	clearStoredUser
// } from "@/app/hooks/useUser";

// export async function middleware(request: NextRequest) {
// 	console.log("Page refreshed: ", request.nextUrl.pathname);

// 	const { pathname } = request.nextUrl;
// 	const response = NextResponse.next();
// 	const userData = getStoredUser(request);
// 	const token = userData?.access_token;
// 	const role = userData?.role;
// 	const isAccessingProtectedAdminRoute = pathname.startsWith("/administration");
// 	const isAccessingProtectedPartnerRoute = pathname.startsWith("/partner");
// 	const isAccessingProtectedUserRoute = pathname.startsWith("/user");

// 	if (
// 		(isAccessingProtectedAdminRoute ||
// 			isAccessingProtectedPartnerRoute ||
// 			isAccessingProtectedUserRoute) &&
// 		!token
// 	) {
// 		console.log("[info] Вход на защищенную страницу.");
// 		clearStoredUser();

// 		return NextResponse.redirect(new URL("/login", request.url));
// 	}
// 	if (
// 		(!token && isAccessingProtectedAdminRoute) ||
// 		(!token && isAccessingProtectedPartnerRoute) ||
// 		(!token && isAccessingProtectedUserRoute)
// 	) {
// 		console.log("[info] Токены отсутствуют.");
// 		// return NextResponse.redirect(new URL("/login", request.url));
// 	}
// 	const checkRoleForProtectedRoute = () => {
// 		if (role === "administrator" && pathname.startsWith("/administration"))
// 			return true;
// 		if (role === "hotel" && pathname.startsWith("/partner")) return true;
// 		if (role === "user" && pathname.startsWith("/user")) return true;
// 		return false;
// 	};

// 	if (
// 		(pathname.startsWith("/login") ||
// 			pathname.startsWith("/forget") ||
// 			pathname.startsWith("/registration")) &&
// 		token
// 	) {
// 		console.log("[info] вход на страницу логина с токеном.");

// 		if (role === "administrator") {
// 			return NextResponse.redirect(new URL("/administration", request.url));
// 		} else if (role === "hotel") {
// 			return NextResponse.redirect(new URL("/partner", request.url));
// 		} else if (role === "user") {
// 			return NextResponse.redirect(new URL("/user", request.url));
// 		}
// 	}
// 	if (
// 		(pathname === "/" ||
// 			pathname.startsWith("/hotels") ||
// 			pathname.startsWith("/news")) &&
// 		token
// 	) {
// 		console.log("[info] вход на страницу логина с токеном.");

// 		if (role === "administrator") {
// 			return NextResponse.redirect(new URL("/administration", request.url));
// 		} else if (role === "hotel") {
// 			return NextResponse.redirect(new URL("/partner", request.url));
// 		}
// 	}
// 	if (
// 		(isAccessingProtectedAdminRoute && role !== "administrator") ||
// 		(isAccessingProtectedPartnerRoute && role !== "hotel") ||
// 		(isAccessingProtectedUserRoute && role !== "user")
// 	) {
// 		if (role === "administrator") {
// 			return NextResponse.redirect(new URL("/administration", request.url));
// 		} else if (role === "hotel") {
// 			return NextResponse.redirect(new URL("/partner", request.url));
// 		} else if (role === "user") {
// 			return NextResponse.redirect(new URL("/user", request.url));
// 		}
// 	} else {
// 		return response;
// 	}

// 	if (!token || checkRoleForProtectedRoute()) {
// 		let redirectResponse = NextResponse.redirect(
// 			new URL("/login", request.url)
// 		);
// 		if (token) {
// 			if (role === "administrator") {
// 				redirectResponse = NextResponse.redirect(
// 					new URL("/administration", request.url)
// 				);
// 			} else if (role === "hotel") {
// 				redirectResponse = NextResponse.redirect(
// 					new URL("/partner", request.url)
// 				);
// 			} else if (role === "user") {
// 				redirectResponse = NextResponse.redirect(new URL("/user", request.url));
// 			}
// 		} else {
// 			response.cookies.delete(USER_DATA_LOCALSTORAGE_KEY);
// 			redirectResponse.cookies.delete(USER_DATA_LOCALSTORAGE_KEY);
// 		}
// 	}
// 	return response;
// }

// export const config = {
// 	matcher: [
// 		{
// 			source:
// 				"/((?!api|_next/static|assets|_next/image|favicon.ico|_next/webpack-hmr).*)",
// 			missing: [
// 				{ type: "header", key: "next-router-prefetch" },
// 				{ type: "header", key: "purpose", value: "prefetch" }
// 			]
// 		},
// 		"/",
// 		"/login",
// 		"/administration/:path",
// 		"/partner/:path",
// 		"/user/:path"
// 	]
// };
