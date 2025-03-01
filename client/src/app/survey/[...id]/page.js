'use client'
import React, { useCallback, useState, useEffect } from 'react'
import '@/../survey-core/defaultV2.min.css'
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import * as SurveyTheme from "survey-core/themes";
import { surveyJSON, responseMapping } from './survey-questions';
import { LoadingSpinner } from '@/components/loader';

export default function SurveyComponent({ params }) {
    const [showTYPage, setShowTYPage] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [repondedBefore, setRespondedBefore] = useState(false);
    const survey = new Model(surveyJSON);

    useEffect(() => {
        setLoading(true);
        fetch(`https://client-management-zz6h.onrender.com/email/responded/${params.id[0]}`)
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    setError(true);
                    throw new Error('Response not ok');
                }
            })
            .then((data) => {
                console.log(data.replied);
                setRespondedBefore(data.replied);
            })
            .catch((error) => {
                setError(true);
                console.log(error);
            }).finally(() => {
                setLoading(false);
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        survey.applyTheme(SurveyTheme.BorderlessLight);
    }, [survey]);

    const saveSurveyResults = useCallback((url, json) => {
        setLoading(true);
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify(json)
        })
            .then(response => {
                if (response.ok) {

                } else {
                    setError(true);
                }
            })
            .catch(error => {
                setError(true);
                console.log(error);
            }).finally(() => {
                setLoading(false);
            })
    }, []);

    const surveyComplete = useCallback((survey) => {
        const numericResponses = [];
        console.log(survey.data);
        Object.keys(survey.data).forEach((question, _) => {
            numericResponses.push(responseMapping[survey.data[question]]);
        });

        console.log(numericResponses);
        setShowTYPage(true);

        const json = {
            responses: numericResponses
        }

        saveSurveyResults(`https://client-management-zz6h.onrender.com/email/submit/${params.id[0]}`, json);
    }, []);

    survey.onComplete.add(surveyComplete);

    return (
        <>
            {
                showTYPage ?
                    <div className='w-[100%] h-[100%] pt-8 text-4xl font-bold '>
                        <div className='w-[80%] m-auto flex justify-center items-center text-center'>
                            {
                                loading ?
                                    <LoadingSpinner /> :
                                    error ?
                                        <>Something Went wrong Please Try again later and make sure URL is untouched</>
                                        :
                                        <>Thank you for filling the form.Your Response has been Recorded</>
                            }
                        </div>
                    </div>
                    :
                    loading ?
                        <div className='w-[100%] h-[100%] pt-8 text-4xl font-bold '>
                            <div className='w-[80%] m-auto flex justify-center items-center text-center'>
                                <LoadingSpinner />
                            </div>
                        </div>
                        : error ?
                            <h1 className='text-center'>Something Went wrong . Please Try again later and make sure URL is unchanged</h1>
                            : repondedBefore ? <h1>Already Responded Before</h1> : <Survey model={survey}></Survey>
            }
        </>
    )
}
