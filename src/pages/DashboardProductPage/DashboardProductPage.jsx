import React, { useState } from "react";
import "./DashboardProductPage.css";

const ProjectsPage = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "E-commerce Website Redesign",
      description: "Complete redesign of the main e-commerce platform with modern UI/UX",
      status: "In Progress",
      progress: 65,
      dueDate: "2024-02-15",
      team: ["JD", "SW", "MJ"],
      priority: "High",
      tasks: { completed: 12, total: 18 }
    },
    {
      id: 2,
      name: "Mobile App Development",
      description: "Develop cross-platform mobile application for iOS and Android",
      status: "Planning",
      progress: 20,
      dueDate: "2024-03-20",
      team: ["SW", "AB"],
      priority: "Medium",
      tasks: { completed: 4, total: 20 }
    },
    {
      id: 3,
      name: "Inventory Management System",
      description: "Implement new inventory tracking and management system",
      status: "Completed",
      progress: 100,
      dueDate: "2024-01-10",
      team: ["MJ", "JD"],
      priority: "High",
      tasks: { completed: 15, total: 15 }
    },
    {
      id: 4,
      name: "Marketing Campaign Q1",
      description: "Quarterly marketing campaign planning and execution",
      status: "On Hold",
      progress: 30,
      dueDate: "2024-03-01",
      team: ["AB", "SW"],
      priority: "Low",
      tasks: { completed: 3, total: 10 }
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    dueDate: "",
    priority: "Medium"
  });

  const addProject = () => {
    const project = {
      id: projects.length + 1,
      ...newProject,
      status: "Planning",
      progress: 0,
      team: ["JD"],
      tasks: { completed: 0, total: 0 }
    };
    setProjects([...projects, project]);
    setShowModal(false);
    setNewProject({ name: "", description: "", dueDate: "", priority: "Medium" });
  };

  const deleteProject = (id) => {
    setProjects(projects.filter(project => project.id !== id));
  };

  const updateProjectStatus = (id, status) => {
    setProjects(projects.map(project => 
      project.id === id ? { ...project, status } : project
    ));
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Completed": return "status-completed";
      case "In Progress": return "status-in-progress";
      case "Planning": return "status-planning";
      case "On Hold": return "status-on-hold";
      default: return "";
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case "High": return "priority-high";
      case "Medium": return "priority-medium";
      case "Low": return "priority-low";
      default: return "";
    }
  };

  const getProgressColor = (progress) => {
    if (progress === 100) return "#10b981";
    if (progress >= 70) return "#3b82f6";
    if (progress >= 40) return "#f59e0b";
    return "#ef4444";
  };

  return (
    <div className="projects-page">
      {/* Header */}
      <div className="projects-header">
        <div className="header-left">
          <h1>Projects</h1>
          <p>Manage your team's projects and track progress</p>
        </div>
        <div className="header-right">
          <div className="search-box">
            <input type="text" placeholder="Search projects..." />
            <span className="search-icon">🔍</span>
          </div>
          <button className="btn-primary" onClick={() => setShowModal(true)}>
            + New Project
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-icon total">📋</div>
          <div className="stat-info">
            <h3>{projects.length}</h3>
            <p>Total Projects</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon progress">🚀</div>
          <div className="stat-info">
            <h3>{projects.filter(p => p.status === "In Progress").length}</h3>
            <p>In Progress</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon completed">✅</div>
          <div className="stat-info">
            <h3>{projects.filter(p => p.status === "Completed").length}</h3>
            <p>Completed</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon overdue">⏰</div>
          <div className="stat-info">
            <h3>{projects.filter(p => new Date(p.dueDate) < new Date() && p.status !== "Completed").length}</h3>
            <p>Overdue</p>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="projects-grid">
        {projects.map(project => (
          <div key={project.id} className="project-card">
            <div className="project-header">
              <div className="project-title">
                <h3>{project.name}</h3>
                <span className={`priority-badge ${getPriorityClass(project.priority)}`}>
                  {project.priority}
                </span>
              </div>
              <div className="project-actions">
                <button className="btn-action edit" title="Edit">✏️</button>
                <button 
                  className="btn-action delete" 
                  onClick={() => deleteProject(project.id)}
                  title="Delete"
                >
                  🗑
                </button>
              </div>
            </div>

            <p className="project-description">{project.description}</p>

            <div className="project-progress">
              <div className="progress-header">
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ 
                    width: `${project.progress}%`,
                    backgroundColor: getProgressColor(project.progress)
                  }}
                ></div>
              </div>
            </div>

            <div className="project-meta">
              <div className="meta-item">
                <span className="meta-label">Due Date:</span>
                <span className="meta-value">{project.dueDate}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Tasks:</span>
                <span className="meta-value">
                  {project.tasks.completed}/{project.tasks.total}
                </span>
              </div>
            </div>

            <div className="project-footer">
              <div className="team-members">
                {project.team.map((member, index) => (
                  <span key={index} className="team-avatar">{member}</span>
                ))}
              </div>
              <div className="project-status">
                <select 
                  value={project.status}
                  onChange={(e) => updateProjectStatus(project.id, e.target.value)}
                  className={`status-select ${getStatusClass(project.status)}`}
                >
                  <option value="Planning">Planning</option>
                  <option value="In Progress">In Progress</option>
                  <option value="On Hold">On Hold</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Project Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Create New Project</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Project Name</label>
                <input 
                  type="text" 
                  value={newProject.name}
                  onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                  placeholder="Enter project name"
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea 
                  value={newProject.description}
                  onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                  placeholder="Enter project description"
                  rows="3"
                />
              </div>
              <div className="form-group">
                <label>Due Date</label>
                <input 
                  type="date" 
                  value={newProject.dueDate}
                  onChange={(e) => setNewProject({...newProject, dueDate: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Priority</label>
                <select 
                  value={newProject.priority}
                  onChange={(e) => setNewProject({...newProject, priority: e.target.value})}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="btn-primary" onClick={addProject}>
                Create Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;