import { NavLink, Outlet } from "react-router";
import classes from "./Layout.module.css";

function Layout() {

  return (
    <div className={classes.layoutWrapper}>
      <header className={classes.header}>
        <div className={`${classes.divWrapper}`}>
          <nav>
            <ul className={classes.navList}>
              <li>
                <NavLink to="/" className={({ isActive }) => isActive ? classes.activeLink : classes.link}>Home</NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className={classes.mainContent}>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;