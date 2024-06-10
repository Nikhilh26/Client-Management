'use client'
import React, { useCallback, useState, useEffect } from 'react'
import '@/../survey-core/defaultV2.min.css'
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import * as SurveyTheme from "survey-core/themes";
import { surveyJSON, responseMapping } from './survey-questions';

export default function survey({ params }) {
    const [showTYPage, setShowTYPage] = useState(false);
    const survey = new Model(surveyJSON);

    useEffect(() => {
        survey.applyTheme(SurveyTheme.BorderlessLight);
    }, [survey]);

    console.log(params.id[0])

    const surveyComplete = useCallback((survey) => {
        // const userId = 1;
        // survey.setValue("userId", userId);
        const numericResponses = {};

        Object.keys(survey.data).forEach((question, index) => {
            numericResponses[index] = responseMapping[survey.data[question]];
        });

        console.log(numericResponses);
        setShowTYPage(true);
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