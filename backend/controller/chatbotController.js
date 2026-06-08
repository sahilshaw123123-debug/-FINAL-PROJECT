const Groq = require("groq-sdk");
const Course = require("../models/Course");
const { model } = require("mongoose");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

exports.coursechatbot = async (req, res) => {
    try {
        const { message } = req.body;
        const courses = await Course.find().limit(30);

        if (courses.length === 0) {
            return res.status(200).json({
                reply: "NO COURSE FOUND, PLEASE ADD COURSE...."
            });
        }

        // FIX: Brought the backtick up to line 18 so the return works perfectly!
        const courseList = courses.map((course, index) => {
            return `${index + 1}. course title: ${course.title}
            category: ${course.category}
            price: ${course.price}
            duration: ${course.duration}
            instructor: ${course.instructor}
            description: ${course.description}`;
        });

        // FIX: Properly structured Groq payload and closed arrays/objects cleanly
        const response = await groq.chat.completions.create({
            model: "llama-3.1-8b-instant",
            messages: [
                {
                    role: "system",
                    content: `available courses:
                    ${courseList}`
                },
                {
                    role: "user",
                    content: message
                }
            ]
        });

        // Send the response back cleanly
        res.json({
            reply: response.choices[0].message.content
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong with the chatbot server." });
    }
};