import React from "react";

function Home() {
  return (
    <div className="container mt-5">
      <h1 className="display-4 text-primary">Welcome to Job Search App</h1>

      <p className="lead text-muted">
        Looking for your dream job? Our Job Search App is here to make your job
        search experience seamless and efficient. Whether you're a jobseeker
        exploring new opportunities or an employer searching for the perfect
        candidate, we've got you covered.
      </p>

      <h2 className="mt-4 text-primary">Key Features:</h2>

      <ul className="list-group">
        <li className="list-group-item bg-light">
          <strong className="text-primary">User-Friendly Interface:</strong>{" "}
          Our app provides an intuitive and user-friendly interface to make your
          job search or hiring process easy and enjoyable.
        </li>
        <li className="list-group-item bg-light">
          <strong className="text-primary">Profile Creation:</strong> Jobseekers
          can create and manage their professional profiles, showcasing their
          skills and experience. Employers can create detailed company profiles
          to attract top talent.
        </li>
        <li className="list-group-item bg-light">
          <strong className="text-primary">Job Listings:</strong> Find a diverse
          range of job opportunities tailored to your skills and preferences.
          Employers can post and manage job openings efficiently.
        </li>
        <li className="list-group-item bg-light">
          <strong className="text-primary">Application Management:</strong>{" "}
          Easily manage job applications, track your progress, and stay
          organized throughout the hiring process.
        </li>
        <li className="list-group-item bg-light">
          <strong className="text-primary">Responsive Design:</strong> Our app is
          built with Bootstrap, ensuring a responsive and visually appealing
          experience across devices.
        </li>
      </ul>

      <p className="mt-4 text-muted">
        Whether you're taking the next step in your career or building a
        talented team, our Job Search App is here to simplify the process.
        Explore the possibilities today!
      </p>
    </div>
  );
}

export default Home;
