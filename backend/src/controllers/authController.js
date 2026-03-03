import jwt from 'jsonwebtoken'

import { ENV } from '../config/env.js'
import User from '../models/User.js'
import UserPreference from '../models/UserPreferences.js'

// Generate JWT token
const generateToken = ( user ) => {
    return jwt.sign(
        { id: user.id, email: user.email },
        ENV.JWT_SECRET,
        { expiresIn: '30d' }
    );
}

// Register new User
export const register = async ( req, res, next ) => {
    try {
        const { email, password, username } = req.body;
        // Validation
        if(!email || !password || !username){
            return res.status(401).json({
                success: false,
                message: 'Please provide email, password and name..'
            })
        }

        // Check if user exist
        const existingUser = await User.findByEmail(email);
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: 'User already exist with this email'
            })
        }

        const user = await User.create({ email, password, username });

        await UserPreference.upsert(user.id, {
            dietary_restrictions: [],
            allergies: [],
            preferred_cuisines: [],
            default_servings: 4,
            measurement_unit:  'metric',
        });

        // const token = generateToken(user);

        res.status(201).json({
            success: true,
            message: 'user registered successfully..',
            // data: {
            //     user: {
            //         id: user.id,
            //         email: user.email,
            //         name: user.name
            //     },
            //     token
            // }
        })

    } catch (error) {
       next(error);
    }
}

export const login = async ( req, res, next ) => {
    try {
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password..'
            })
        }

        const user = await User.findByEmail(email);
        if(!user){
            return res.status(400).json({
                success: false,
                message: 'Invalid Credentials..'
            })
        }

        const isPasswordValid = await User.verifyPassword(password, user.password_hash );
        if(!isPasswordValid){
            return res.status(400).json({
                success: false,
                message: 'Invalid Credentials..'
            })
        }

        const token = generateToken(user);

        res.json({
            success: true,
            message: 'Login Successfully..',
            data:{
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name
                },
                token
            } 
        })

    } catch (error) {
        next(error)
    }
}

export const getCurrentuser = async ( req, res, next ) => {
    try {
        const user = await User.findById(req.user.id);

        if(!user){
            return res.status(400).json({
                success: false,
                message: 'User not found..'
            })
        }

        res.json({
            success: true,
            data: { user }
        })

    } catch (error) {
        next(error)
    }
}

export const requestPasswordReset = async ( req, res, next ) => {
    try {
        const { email } = req.body;

        if(!email){
            return res.status(400).json({
                success: false,
                message: 'Please provide email..'
            })
        }

        const user = await User.findByEmail(email);

        res.json({
            success: true,
            message: 'Id an account exists with this email, a password reset link has been sent.'
        })

    } catch (error) {
        next(error)
    }
}