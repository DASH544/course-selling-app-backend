import express from "express"
import {rateLimit} from 'express-rate-limit'

export const rateLimiter=rateLimit(
    {
        windowMs: 15 * 60 * 10, 
	    limit: 5,
    })