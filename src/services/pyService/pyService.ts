import { BoatClass } from "../../model";

const boatClasses: BoatClass[] = require("./py2021.json");

export const searchBoatClasses = (searchTerm: string): Promise<BoatClass[]> => {
    return new Promise(resolve => {
          const filtered =
            searchTerm?.length > 0
              ? boatClasses.filter((doggo) =>
                  doggo.className.toLocaleUpperCase().includes(searchTerm)
                )
              : [];
          console.info("service - searched boat classes", searchTerm, filtered);
          resolve(filtered);
      });
};