import { CellType } from "../../enums";
import { AppHeader, AppFooter, ListComponent } from "../../components";

import styles from "./HomeScreen.module.css";

export const HomeScreen = () => {
  return (
    <div className={styles.container}>
      <AppHeader />
      <main>
        <div className={styles.listsSection}>
          <ListComponent id="0" cellType={CellType.Highlights} cellCount={1} />
          <ListComponent id="1" title="Most popular" />
          <ListComponent
            id="2"
            title="Movies"
            cellType={CellType.Poster}
            cellCount={7}
          />
          <ListComponent
            id="3"
            title="Movies"
            cellType={CellType.Frame}
            cellCount={3}
          />
          <ListComponent
            id="4"
            title="Most popular"
            cellType={CellType.Poster}
            cellCount={4}
            imageSize="w342"
          />
        </div>
      </main>
      <AppFooter />
    </div>
  );
};
