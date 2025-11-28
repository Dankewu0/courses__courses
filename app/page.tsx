'use client';
import { useState } from "react";
import './globals.css';

type Course = {
  id: number;
  category: string;
  instructor: string;
  title: string;
  price: string;
  img: string;
};

const coursesData: Course[] = [
  { id: 1, category: "marketing", instructor: "Jerome Bell", title: "The Ultimate Google Ads Training Course", price: "$500", img: "/1.png" },
  { id: 2, category: "management", instructor: "Marvin McKinney", title: "Product Management Fundamentals", price: "$480", img: "/2.png" },
  { id: 3, category: "hr", instructor: "Leslie Alexander Li", title: "HR Management and Analytics", price: "$200", img: "/3.png" },
  { id: 4, category: "marketing", instructor: "Kristin Watson", title: "Brand Management & PR Communications", price: "$530", img: "/4.png" },
  { id: 5, category: "design", instructor: "Guy Hawkins", title: "Graphic Design Basic", price: "$500", img: "/5.png" },
  { id: 6, category: "management", instructor: "Dianne Russell", title: "Business Development Management", price: "$400", img: "/6.png" },
  { id: 7, category: "development", instructor: "Brooklyn Simmons", title: "Highload Software Architecture", price: "$600", img: "/7.png" },
  { id: 8, category: "hr", instructor: "Kathryn Murphy", title: "Human Resources - Selection and Recruitment", price: "$150", img: "/8.png" },
  { id: 9, category: "design", instructor: "Cody Fisher", title: "User Experience. Human-centered Design", price: "$240", img: "/9.png" },
];

export default function CoursesPage() {
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const [visibleCount, setVisibleCount] = useState<number>(9);

  const categories = [
    { name: "all", label: "All" },
    { name: "marketing", label: "Marketing" },
    { name: "management", label: "Management" },
    { name: "hr", label: "HR & Recruiting" },
    { name: "design", label: "Design" },
    { name: "development", label: "Development" },
  ];

  const filteredCourses = coursesData
      .filter(c => filter === "all" || c.category === filter)
      .filter(c => c.title.toLowerCase().includes(search.toLowerCase()))
      .slice(0, visibleCount);

  return (
      <div className="course-section">
        <p className="course-section__subtitle">ENJOY YOUR STUDYING!</p>
        <h1 className="course-section__title">Our online courses</h1>

        <div className="filter-bar">
          <div className="filter-bar__categories">
            {categories.map(cat => (
                <button
                    key={cat.name}
                    className={`filter-bar__category-btn ${filter === cat.name ? "filter-bar__category-btn--active" : ""}`}
                    onClick={() => setFilter(cat.name)}
                >
                  {cat.label} {cat.name !== "all" && <span>{coursesData.filter(c => c.category === cat.name).length}</span>}
                </button>
            ))}
          </div>
          <div className="filter-bar__search">
            <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search course..."
                className="filter-bar__search-input"
            />
            <div className="filter-bar__search-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <circle cx={11} cy={11} r={8}></circle>
                <line x1={21} y1={21} x2={16.65} y2={16.65}></line>
              </svg>
            </div>
          </div>
        </div>

        <div className="course-section__list">
          {filteredCourses.map(course => (
              <div key={course.id} className="course-card">
                <div className="course-card__image-container course-card__image-container--yellow">
                  <img src={course.img} alt={course.instructor} className="course-card__instructor-img" />
                </div>
                <div className="course-card__info">
                  <span className={`course-card__tag course-card__tag--${course.category}`}>{course.category}</span>
                  <h3 className="course-card__title">{course.title}</h3>
                  <p className="course-card__meta">
                    <span className="course-card__price">{course.price}</span> | by {course.instructor}
                  </p>
                </div>
              </div>
          ))}
        </div>

        {visibleCount < coursesData.length && (
            <button className="course-section__load-more-btn" onClick={() => setVisibleCount(prev => prev + 3)}>
              Load more
            </button>
        )}
      </div>
  );
}
