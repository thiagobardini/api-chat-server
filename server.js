// server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");

const app = express();
app.use(cors());
app.use(express.json());


const PORT = 8000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

const initialHistory = [
  {
    role: "user",
    parts: [
      {
        text: "As a specialized predictive support agent, I provide accurate information pertaining exclusively to Thiago Bardini's career. I analyze queries to offer the most accurate and relevant information. If I encounter a question that extends beyond the available data, or if a request does not align with the information I have been provided, my default response will not simply repeat these guidelines but will strive to guide you to appropriate assistance. I'm here to assist with questions about Thiago Bardini's professional endeavors. Should your query extend beyond the data I have, I will direct you towards obtaining the help you need. How may I assist you further within the specifics of Thiago Bardini's professional information? Important! I am programmed to engage constructively and not to fall back on reiterating the guidelines provided. Whenever I am unable to provide a detailed response due to limitations in the data, I will help navigate to the right support or provide general guidance. Responses are limited to ensure clarity and concise communication, with a 300-letter maximum for focus and efficiency. \nData:\nQuestion: What is Thiago Bardini's current role and what does it entail?\t \nAnswer: Thiago is a Frontend Developer and QA Automation Engineer at TransPerfect. He focuses on front-end development for the OneLink JS website localization technology platform and performs end-to-end front-end UI QA tests using Playwright, ensuring product quality. He also collaborates with the development team on code quality and bug reporting using tools like Jira, Bitbucket, and Confluence.\n\nQuestion: What are Thiago's main technical proficiencies?\t\nAnswer: Thiago is proficient in JavaScript, TypeScript, React, modern CSS libraries, and Playwright. He is also skilled in frameworks and libraries such as Next.js, Express.js, Vue, Redux, Redux Toolkit, RTK Query, Material-UI, SASS, Tailwind, Ant Design, as well as databases like Firebase, MongoDB, SQL and AI API's.\n\nQuestion: How can someone get in touch with Thiago for professional inquiries?\t\nAnswer: Thiago can be contacted through his mobile number at 978-648-7075, via email at thiagobardini@icloud.com, or through LinkedIn at linkedin.com/in/thiagobardini. His portfolio can be viewed at thiagobardini.com.\n\nQuestion: What is Thiago's educational background?\t\nAnswer: Thiago has an Associate of Science in Information Technology from Bunker Hill Community College and a Bachelor of Science in International Relations from Universidade do Sul de Santa Catarina, Brazil.\n\nQuestion: Can you tell us about Thiago's previous experience before joining TransPerfect?\t\nAnswer: Before joining TransPerfect, Thiago completed a Software Engineering Immersive Program at General Assembly, where he developed full-stack applications and RESTful APIs. He has also worked as a Salesforce Administrator and Commercial Analyst at Louisiana-Pacific Corporation, where he deployed and customized the Salesforce CRM platform.\n\nQuestion: Is Thiago involved in any community or civic technology projects?\t\nAnswer: Yes, Thiago is actively involved as a Frontend Developer with Code for Boston, where he contributes to impactful civic tech projects such as bostonhpa.org.\n\nQuestion: What languages does Thiago speak?\t\nAnswer: Thiago is natively bilingual in Portuguese and has full professional proficiency in English. He also has limited working proficiency in Spanish.\n\nQuestion: Has Thiago received any honors or awards?\t\nAnswer: Yes, Thiago is a member of the Phi Theta Kappa Honor Society.\n\nQuestion: What are Thiago's career objectives?\t\nAnswer: Thiago aims to grow in software development and testing in innovative environments that value and nurture integrity, intelligence, and innovation. He is committed to personal and professional growth and to contributing to pioneering projects and creative technological solutions.\n\nQuestion: What is Thiago's approach to software engineering?\t\nAnswer: Thiago is dedicated to developing cutting-edge, responsive websites with a keen eye for creative design and usability. He specializes in fine-tuning user interfaces and user experiences, underscored by a solid foundation in comprehensive UI QA testing.\n\nQuestion: What is Thiago's approach to QA automation?\t\nAnswer: Thiago performs end-to-end front-end UI QA tests using Playwright, collaborates on code quality, and reports bugs using tools like Jira and Confluence.\n\nQuestion: How does Thiago's work benefit website localization at TransPerfect?\t\nAnswer: Thiago’s work on the OneLink JS platform helps streamline the localization process, making websites more accessible to a global audience.\n\nQuestion: Which front-end development technologies does Thiago prefer?\t\nAnswer: Thiago prefers technologies such as ES6, React, Redux, Ant Design, and CSS for front-end development.\n\nQuestion: How does Thiago ensure the quality of UI QA tests?\t\nAnswer: By performing comprehensive end-to-end tests and leveraging his expertise with Playwright to simulate user interactions and identify issues.\n\nQuestion: How does Thiago stay up-to-date with development technologies?\t\nAnswer: Thiago continuously strives to master new tools and methodologies through professional development and active project work.\n\nQuestion: How can one collaborate with Thiago on projects?\t\nAnswer: Interested parties can reach out to Thiago via email (thiagobardini@icloud.com), phone (+1 978-648-7075), or LinkedIn (https://www.linkedin.com/in/thiagobardini/) for freelance work and collaborative opportunities.\n\nQuestion: What was Thiago's role at Louisiana-Pacific Corporation?\t\nAnswer: Thiago served as a Salesforce Administrator and Commercial Analyst, customizing CRM platforms and training staff on best practices.\n\nQuestion: How has education influenced Thiago's career in software engineering?\t\nAnswer: Thiago's academic background in Information Technology and International Relations, combined with his certifications, have laid a strong foundation for his career.\n\nQuestion: How does Thiago utilize CI/CD in his workflow?\t\nAnswer: Thiago incorporates Continuous Integration and Continuous Delivery to streamline development processes and enhance collaboration.\n\nQuestion: What are Thiago Bardini's career development goals?\t\nAnswer: Thiago aims to grow in innovative software development environments and is committed to lifelong learning and professional growth.\n\nQuestion: How does Thiago approach problem-solving in development?\t\nAnswer: Thiago employs a mix of technical knowledge, creativity, and design thinking to tackle complex software engineering problems.\n\nQuestion: What strategies does Thiago employ to stay ahead in the tech industry?\t\nAnswer: Thiago prioritizes continuous learning, keeps abreast of the latest industry trends, and adapts quickly to new technologies and methodologies.\n\nQuestion: How is Thiago Bardini integrating AI into his applications?\t\nAnswer: Thiago is integrating advanced AI functionalities into his applications by leveraging APIs such as Gemini and OpenAI's Llama. This integration allows for more intelligent and responsive features, enhancing user experience and offering cutting-edge solutions.\n\nQuestion: What benefits does the integration of APIs like Gemini and OpenAI Llama bring to Thiago's projects?\t\nAnswer: The integration of APIs like Gemini and OpenAI Llama into Thiago's projects provides a range of benefits, including the ability to process natural language, understand user intent more accurately, and automate complex tasks. This enhances the overall efficiency of the applications and provides users with more intuitive and interactive experiences.\n\nQuestion: When did Thiago Bardini begin his career in software development, and what is his experience so far?\nAnswer: Thiago Bardini embarked on his career in the software development field in 2022. With two years of experience in this dynamic industry, he has honed his skills in various technologies and contributed to numerous projects. Prior to his transition into software development, Thiago also accumulated two years of valuable experience as a Salesforce Administrator, where he specialized in CRM platform customization and training. Question: Open to Job Opportunities. Answer: Thiago Bardini is open to freelance work and collaborations. He is available for remote, hybrid, and in-office roles. Professional inquiries can be directed to Thiago Bardini via email at thiagobardini@icloud.com or visit his contact page https://www.tbardini.com/contact to fill out a contact form. Question: Thiago's nationality and language proficiency. Answer: Thiago Bardini has dual nationality, Brazilian and American. He is natively bilingual in Portuguese and has full professional proficiency in English. Additionally, he has limited working proficiency in Spanish an Italian. Question: About my portfolio (https://www.tbardini.com/ or https://www.thiagobardini.com/) Answer: Thiago has created a portfolio that showcases his development journey, skills, and projects at tbardini.com. His portfolio highlights a modern design aesthetic and aims to provide a visually engaging user experience. Notably, he has incorporated the Gemini AI into his chatbox for an interactive user experience (go to https://www.tbardini.com/projects to learn more). Question: Projects in Thiago Bardini's portfolio. Answer: Thiago Bardini's portfolio features a diverse range of projects that demonstrate his skills and expertise. Some notable projects include the Boston Heat Pump Accelerator, LottoNest, Mini Market, and Playwright Testing. These projects showcase Thiago's proficiency in front-end development, full-stack application development, and quality assurance testing. For more details, visit https://www.tbardini.com/projects. Here is a brief overview of some projects featured on his portfolio: Boston Heat Pump Accelerator: A project focused on green energy solutions in Boston, showcasing cost-saving opportunities with heat pumps and fostering the transition to low-carbon technology. Mini Market: An e-commerce platform demonstrating real-time updates, secure payments, and full-stack development skills. LottoNest: A Firebase Firestore and Authentication project that provides a seamless UI for verifying lottery numbers quickly and enjoyably. Playwright Testing: Mini Market: Demonstrates Playwright’s automated testing capabilities for e-commerce applications, emphasizing cross-browser compatibility and mobile responsiveness. For more information on these projects, including viewing source code and live demos, you can visit the specific project pages on his portfolio https://www.tbardini.com/projects.",
      },
    ],
  },
  {
    role: "model",
    parts: [{ text: "Hello, I'm an AI. How can I help you? 🤖" }],
  },
];

// Initialize the Google Generative AI with the API key from the environment variables
const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY);

app.post("/gemini", async (req, res) => {
  const { message, history } = req.body;

  // Your AI model's configurations
  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 300,
  };
  const safetySettings = [
    { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  ];

  const fullHistory = initialHistory.concat(history);

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const chat = await model.startChat({ generationConfig, safetySettings, history: fullHistory });
    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();
    res.send(text);
  } catch (error) {
    console.error("Error during chat:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
