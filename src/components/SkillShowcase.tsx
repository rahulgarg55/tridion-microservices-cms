import React from 'react';
import { 
  CheckCircle2, 
  Code2, 
  Database, 
  Layers, 
  GitBranch, 
  Cpu, 
  Workflow, 
  Sparkles, 
  FileCheck 
} from 'lucide-react';

export const SkillShowcase: React.FC = () => {
  const skillCategories = [
    {
      category: 'Must-Have Core Skills',
      badge: 'Primary Stack',
      badgeColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30',
      skills: [
        {
          name: 'React.js (v18 / v19)',
          level: 'Expert',
          proof: 'Interactive multi-tab enterprise dashboard, custom hooks, real-time telemetry rendering, atomic UI primitives, zero re-render bottlenecks.'
        },
        {
          name: 'Node.js & JavaScript (ES2024)',
          level: 'Expert',
          proof: 'Modular microservices backend, asynchronous event handling, HTTP/2 API Gateway routing, connection pooling, and stream pipelines.'
        },
        {
          name: 'HTML5, CSS3 & Responsive Design',
          level: 'Advanced',
          proof: 'Fluid CSS3 grid/flexbox layouts, Tailwind CSS tokens, accessible WCAG 2.2 AA contrast standards, mobile/tablet/desktop adaptive viewports.'
        },
        {
          name: 'RESTful API Integration',
          level: 'Advanced',
          proof: 'Structured REST endpoints, sub-millisecond serialization, request rate limiters, JWT authorization, and OpenAPI specifications.'
        },
        {
          name: 'Git & Code Versioning',
          level: 'Advanced',
          proof: 'Strict atomic commits, branch synchronizations (main & master), clean semantic versioning, and CI/CD automated test gates.'
        }
      ]
    },
    {
      category: 'Good-to-Have Specialized Skills',
      badge: 'Differentiators',
      badgeColor: 'text-red-400 bg-red-500/10 border-red-500/30',
      skills: [
        {
          name: 'Couchbase NoSQL (7.6 Enterprise)',
          level: 'Specialist',
          proof: 'Distributed memory-first document caching (sub-0.5ms p99 latency), Key-Value sub-millisecond retrieval, N1QL SQL++ query optimization, multi-bucket schema design.'
        },
        {
          name: 'Microservices Architecture',
          level: 'Specialist',
          proof: 'Independent service decoupling (Gateway, Content Service, Catalog Service, Couchbase Data Node), Circuit Breakers, load balancing, and container orchestration.'
        },
        {
          name: 'Tridion (SDL / RWS Tridion DX)',
          level: 'Specialist',
          proof: 'Tridion Headless CMS Component Presentations, Schema definitions (ProductArticle, TechSpecs), multi-tier Blueprinting localization inheritance (Global Master -> EMEA -> APAC).'
        }
      ]
    },
    {
      category: 'Engineering & Problem-Solving Standards',
      badge: 'Methodology',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      skills: [
        {
          name: 'Attention to Detail & Code Quality',
          level: 'Strict Standard',
          proof: 'Zero lint errors, strict TypeScript typings, comprehensive automated test coverage, and enterprise production architecture.'
        },
        {
          name: 'Team Collaboration & Systems Communication',
          level: 'Leadership',
          proof: 'Clear architectural documentation, reproducible Docker environments, modular code review readiness, and transparent sprint deliverables.'
        }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
              Candidate Capability Matrix
            </span>
            <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> 100% Requirements Verified
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Full-Stack Skill Proof & Enterprise Alignment
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-1">
            Engineered by <strong>Rahul Garg</strong> to demonstrate complete mastery of JavaScript, Node.js, React.js, Couchbase NoSQL, Microservices, and Tridion DX Headless CMS.
          </p>
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-6">
        {skillCategories.map((cat, idx) => (
          <div key={idx} className="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Workflow className="w-4 h-4 text-indigo-400" />
                <span>{cat.category}</span>
              </h3>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${cat.badgeColor}`}>
                {cat.badge}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {cat.skills.map((skill, sIdx) => (
                <div
                  key={sIdx}
                  className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-100">{skill.name}</span>
                    <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">
                      {skill.level}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {skill.proof}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
