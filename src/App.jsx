import { useState, useEffect } from "react"
import { getJobs } from "./hooks/fetchJobs"

import AOS from 'aos'
import 'aos/dist/aos.css'

import desktopbg from "/images/bg-header-desktop.svg"

import './App.css'

const App = () => {

    const [allJobs, setAllJobs] = useState([])

    const [filteres, setFilteres] = useState([])

    useEffect(() => {
        const fetchingJobs = async () => {
            const jobs = await getJobs()
            setAllJobs(jobs)
        }

        fetchingJobs()

        AOS.init({
            duration: 400,
            delay: 100
        })
    }, [])


    const filter = (value) => {
        let filteredJobs = { ...allJobs }


    }

    

    return (
        <main className="main">
            <div className="background-div">
                <img src={desktopbg}/>
            </div>


            <section className="filter-section">

            </section>

            <section className="jobs-section">
                {allJobs ? allJobs.map(job => (

                    <div key={job.id} className={job.featured ? "job-card-featured" : "job-card"} data-aos="fade-up">

                        <>
                        <div className="job-info">
                            <img alt={`${job.company}`} src={`${job.logo}`}/>

                            <div>

                                <div className="company">
                                    <p>{job.company}</p>
                                    {job.new && <p>NEW!</p>}
                                    {job.featured && <p>FEATURED</p>}
                                </div>

                                <h3 className="job-title">Senior Frontend Developer</h3>

                                <ul className="job-details">
                                    <li>{job.postedAt}</li>
                                    <div className="custom-bullet"></div>
                                    <li>{job.contract}</li>
                                    <div className="custom-bullet"></div>
                                    <li>{job.location}</li>
                                </ul>

                            </div>

                        </div>
                        </>

                        <ul className="job-requirements" aria-label="Requiredments List">

                            <li>
                                <button type="button" aria-label={`Filter by ${job.role}`} onClick={() => filter(job.role)}>{job.role}</button>
                            </li>

                            <li>
                                <button type="button" aria-label={`Filter by ${job.level}`} onClick={() => filter(job.level)}>{job.level}</button>
                            </li>
                            
                            {job.tools && job.tools.map(tool => (
                                <li key={tool}>
                                    <button type="button" aria-label={`Filter by ${tool}`} onClick={() => filter(tool)}>{tool}</button>
                                </li>
                            ))}

                            {job.languages && job.languages.map(language => (
                                <li key={language}>
                                    <button type="button" aria-label={`Filter by ${language}`} onClick={() => filter(language)}>{language}</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )) : (
                    <h1>...Loading</h1>
                )}
            </section>

        </main>
    )
}

export default App