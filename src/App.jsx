import { useState, useEffect } from "react"
import { getJobs } from "./hooks/fetchJobs"

import AOS from 'aos'
import 'aos/dist/aos.css'

import desktopbg from "/images/bg-header-desktop.svg"


import './App.css'

const App = () => {

    const [allJobs, setAllJobs] = useState([])
    const [displayedJobs, setDisplayedJobs] = useState([])

    const [filters, setFilters] = useState([])

    useEffect(() => {

        const fetchingJobs = async () => {
            const jobs = await getJobs()
            setAllJobs(jobs)
            setDisplayedJobs(jobs)
        }
        fetchingJobs()

        AOS.init({
            duration: 400,
            delay: 100
        })
    }, [])


    const filter = (value) => {

        let newFilters;
  
        if(filters.includes(value)) {
            newFilters = filters.filter(ele => ele !== value)
        }
        else {
            newFilters = [ ...filters, value ]
        }

        setFilters(newFilters)
    }

    useEffect(() => {

        if(filters.length !== 0) {
            const filteredJobs = allJobs.filter(job => {
                return Object.values(job).some(jobValue => {
                    if(Array.isArray(jobValue)) {
                        return jobValue.some(arrItem => filters.includes(arrItem))
                    }

                    return filters.includes(jobValue)
                })
            })
            setDisplayedJobs(filteredJobs);
            return
        }
        else {
            setDisplayedJobs(allJobs)
        }

    }, [filters, allJobs])

    const clearFilter = () => {
        setFilters([])
    }


    return (
        <main className="main">
            <div className="background-div">
                <img src={desktopbg}/>
            </div>


            <section className={filters.length === 0 ? "filter-section-unfiltered" : "filter-section"}>
                {filters.length > 0 && (
                    <>
                    <ul className="filter-list" aria-label="Filter List" >
                        {filters.map(selectedFilter => (
                            <li key={selectedFilter}>
                                <p>{selectedFilter}</p>
                                <button type="button" className="remove-filter" onClick={() => filter(selectedFilter)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14">
                                        <path d="M11.314 0l2.121 2.121-4.596 4.596 4.596 4.597-2.121 2.121-4.597-4.596-4.596 4.596L0 11.314l4.596-4.597L0 2.121 2.121 0l4.596 4.596L11.314 0z"/>
                                    </svg>
                                </button>
                            </li>
                        ))}
                    </ul>
                    <button type="button" className="clear-button" onClick={() => clearFilter()}>Clear</button>
                    </>
                )}

            </section>

            <section className="jobs-section">
                {displayedJobs ? displayedJobs.map(job => (

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