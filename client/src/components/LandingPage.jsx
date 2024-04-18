import { NavLink } from "react-router-dom";

const LandingPage = ({ handleShowEmployees }) => {
  // This following section will display the table with the records of individuals.
  return (
    <>
      <h2>Welcome to the Landing Page</h2>
      <NavLink
        className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
        to="/record-list"
      >
        Records
      </NavLink>
    </>
  );
};

export default LandingPage;
