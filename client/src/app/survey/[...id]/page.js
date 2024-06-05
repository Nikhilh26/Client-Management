'use client'
import React, { useCallback, useState } from 'react'
import '@/../survey-core/defaultV2.min.css'
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import * as SurveyTheme from "survey-core/themes";

const surveyJson = {
    elements: [{
        name: "FirstName",
        title: "Enter your first name:",
        type: "text"
    }, {
        name: "LastName",
        title: "Enter your last name:",
        type: "text"
    }, {
        name: "favoriteColor",
        type: "radiogroup",
        title: "What is your favorite color?",
        choices: [
            "Red",
            "Green",
            "Blue",
            "Yellow"
        ]
    }]
};

export default function page({ params }) {
    const [showTYPage, setShowTYPage] = useState(false);
    console.log(params.id[0]);
    const survey = new Model(surveyJson);
    survey.applyTheme(SurveyTheme.BorderlessLight);

    const surveyComplete = useCallback((survey) => {
        const userId = 1;
        survey.setValue("userId", userId);
        console.log(survey.data)
        setShowTYPage(true);
    }, []);

    survey.onComplete.add(surveyComplete);

    return (
        <>
            {
                showTYPage ?
                    <div className='w-[100%] h-[100%] pt-8 text-4xl font-bold'>
                        <div className='w-[80%] m-auto text-center'>
                            Thank you for filling the form
                        </div>
                    </div> :
                    <Survey model={survey}></Survey>
            }
        </>
    )
}

function saveSurveyResults(url, json) {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(json)
    })
        .then(response => {
            if (response.ok) {
                // Handle success
            } else {
                // Handle error
            }
        })
        .catch(error => {
            // Handle error
        });
}