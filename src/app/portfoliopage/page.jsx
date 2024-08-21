// PortfolioPage.jsx
"use client"
import React, { useEffect, useState } from 'react';
import ProjectCard from '../../components/Card/ProjectSection';
import projectsData from '../../components/json/work.json';
import ProjectSection from '../../components/Card/ProjectSection';
import MyNavbar from '../../components/navbar/MyNavbar';
import { Container } from 'react-bootstrap';

const PortfolioPage = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        setProjects(projectsData);
    }, []);

    const groupedProjects = projects.reduce((acc, project) => {
        if (!acc[project.creator]) {
            acc[project.creator] = [];
        }
        acc[project.creator].push(project);
        return acc;
    }, {});

    return (
        <>
<MyNavbar/>

        <div className="container-fluid portfolio-container p-0">
        {Object.keys(groupedProjects).map(creator => (
            <ProjectSection key={creator} creator={creator} projects={groupedProjects[creator]} />
        ))}
    </div>
        </>
    );
};

export default PortfolioPage;