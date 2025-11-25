import ratelimit from "../config/upstash.js";

const rateLimirer = async (req, res, next) => {
    try{
        const { success } = await ratelimit.limit("my-limit-key");
        if (!success) {
            return res.status(429).json({ message: "Too many requests try again later" });
        }
        next();
    } catch (error) {
        console.log("Rate limiting error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export default rateLimirer;