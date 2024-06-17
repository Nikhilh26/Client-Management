// Capacity
// I feel confident in my ability to handle unexpected financial challenges.
// I have sufficient financial resources to absorb potential losses in my investments.
// I can quickly liquidate investments if needed without substantial financial harm.

// Loss Aversion
// I am more concerned about potential losses than potential gains when making investment decisions.
// I often choose lower - risk investments to avoid the possibility of loss.
// The fear of losing money impacts my investment choices more than the hope of making money.

// Risk Tolerance
// I am willing to take substantial financial risks to achieve high returns.
// I am comfortable investing in high - volatility markets.
// I prefer high - risk, high - reward investment opportunities over safer, lower -return ones.Composure

// Composure
// I remain calm and stick to my investment strategy during market downturns.
// I can manage my emotions effectively when my investments perform poorly.
// I am confident in my long - term investment plan, even when the market is volatile.

//     Impulsivity
// I often make investment decisions quickly without thoroughly considering all the potential risks and benefits.
// I make investing decisions quickly, without considering all the options.
// I tend to spend money impulsively, without planning or budgeting
export const surveyJSON = {
    title: "Financial Investment Attitude Survey",
    pages: [
        {
            name: "page1",
            elements: [
                {
                    type: "radiogroup",
                    name: "confidence",
                    title: "I feel confident in my ability to handle unexpected financial challenges.",
                    isRequired: true,
                    choices: ["Strongly Disagree", "Somewhat Disagree", "Somewhat Agree", "Strongly Agree"]
                },
                {
                    type: "radiogroup",
                    name: "resources",
                    title: "I have sufficient financial resources to absorb potential losses in my investments.",
                    isRequired: true,
                    choices: ["Strongly Disagree", "Somewhat Disagree", "Somewhat Agree", "Strongly Agree"]
                },
                {
                    type: "radiogroup",
                    name: "liquidity",
                    title: "I can quickly liquidate investments if needed without substantial financial harm.",
                    isRequired: true,
                    choices: ["Strongly Disagree", "Somewhat Disagree", "Somewhat Agree", "Strongly Agree"]
                }
            ]
        },
        {
            name: "page2",
            elements: [
                {
                    type: "radiogroup",
                    name: "loss_concern",
                    title: "I am more concerned about potential losses than potential gains when making investment decisions.",
                    isRequired: true,
                    choices: ["Strongly Disagree", "Somewhat Disagree", "Somewhat Agree", "Strongly Agree"]
                },
                {
                    type: "radiogroup",
                    name: "low_risk_preference",
                    title: "I often choose lower-risk investments to avoid the possibility of loss.",
                    isRequired: true,
                    choices: ["Strongly Disagree", "Somewhat Disagree", "Somewhat Agree", "Strongly Agree"]
                },
                {
                    type: "radiogroup",
                    name: "loss_fear",
                    title: "The fear of losing money impacts my investment choices more than the hope of making money.",
                    isRequired: true,
                    choices: ["Strongly Disagree", "Somewhat Disagree", "Somewhat Agree", "Strongly Agree"]
                }
            ]
        },
        {
            name: "page3",
            elements: [
                {
                    type: "radiogroup",
                    name: "risk_tolerance",
                    title: "I am willing to take substantial financial risks to achieve high returns.",
                    isRequired: true,
                    choices: ["Strongly Disagree", "Somewhat Disagree", "Somewhat Agree", "Strongly Agree"]
                },
                {
                    type: "radiogroup",
                    name: "high_volatility_comfort",
                    title: "I am comfortable investing in high-volatility markets.",
                    isRequired: true,
                    choices: ["Strongly Disagree", "Somewhat Disagree", "Somewhat Agree", "Strongly Agree"]
                },
                {
                    type: "radiogroup",
                    name: "high_risk_preference",
                    title: "I prefer high-risk, high-reward investment opportunities over safer, lower-return ones.",
                    isRequired: true,
                    choices: ["Strongly Disagree", "Somewhat Disagree", "Somewhat Agree", "Strongly Agree"]
                }
            ]
        },
        {
            name: "page4",
            elements: [
                {
                    type: "radiogroup",
                    name: "composure_during_downturns",
                    title: "I remain calm and stick to my investment strategy during market downturns.",
                    isRequired: true,
                    choices: ["Strongly Disagree", "Somewhat Disagree", "Somewhat Agree", "Strongly Agree"]
                },
                {
                    type: "radiogroup",
                    name: "emotion_management",
                    title: "I can manage my emotions effectively when my investments perform poorly.",
                    isRequired: true,
                    choices: ["Strongly Disagree", "Somewhat Disagree", "Somewhat Agree", "Strongly Agree"]
                },
                {
                    type: "radiogroup",
                    name: "long_term_confidence",
                    title: "I am confident in my long-term investment plan, even when the market is volatile.",
                    isRequired: true,
                    choices: ["Strongly Disagree", "Somewhat Disagree", "Somewhat Agree", "Strongly Agree"]
                }
            ]
        },
        {
            name: "page5",
            elements: [
                {
                    type: "radiogroup",
                    name: "quick_decisions",
                    title: "I often make investment decisions quickly without thoroughly considering all the potential risks and benefits.",
                    isRequired: true,
                    choices: ["Strongly Disagree", "Somewhat Disagree", "Somewhat Agree", "Strongly Agree"]
                },
                {
                    type: "radiogroup",
                    name: "impulsive_decisions",
                    title: "I make investing decisions quickly, without considering all the options.",
                    isRequired: true,
                    choices: ["Strongly Disagree", "Somewhat Disagree", "Somewhat Agree", "Strongly Agree"]
                },
                {
                    type: "radiogroup",
                    name: "impulsive_spending",
                    title: "I tend to spend money impulsively, without planning or budgeting.",
                    isRequired: true,
                    choices: ["Strongly Disagree", "Somewhat Disagree", "Somewhat Agree", "Strongly Agree"]
                }
            ]
        }
    ]
};

export const responseMapping = {
    "Strongly Disagree": 1,
    "Somewhat Disagree": 2,
    "Somewhat Agree": 3,
    "Strongly Agree": 4
};