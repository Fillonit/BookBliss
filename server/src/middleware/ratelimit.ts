import { Ratelimit } from "@upstash/ratelimit";
import { Redis, RedisConfigNodejs } from "@upstash/redis";
import express from "express";

const redisConfig: RedisConfigNodejs = {
	url: process.env.UPSTASH_REDIS_REST_URL,
	token: process.env.UPSTASH_REDIS_REST_TOKEN,
};

const redis = new Redis(redisConfig);
export const ratelimitMiddleware = (
	maxRequests: number,
	windowSize: number
) => {
	const ratelimit = new Ratelimit({
		redis,
		limiter: Ratelimit.slidingWindow(maxRequests, `${windowSize}s`),
		analytics: false,
	});

	return async (
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) => {
		const ip = req.headers["x-forwarded-for"]?.toString() ?? "";
		console.log(ip);
		const { success, reset } = await ratelimit.limit(ip);
		if (!success) {
			const now = new Date().getTime();
			const retryAfter = Math.floor((Number(reset) - now) / 1000);
			return res.status(429).setHeader("Retry-After", retryAfter).json({
				message: "Too many requests",
				reset,
			});
		} else {
			next();
		}
	};
};
