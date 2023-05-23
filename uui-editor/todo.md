## TODO

Plate issues to create:
- Create issue about copying table which has empty cells from Microsoft Excel. The problem here `packages/core/src/plugins/html-deserializer/utils/cleanHtmlEmptyElements.ts`. `ALLOWED_EMPTY_ELEMENTS` should be extended with `TD` and `TH` on plate side.  [Video](https://epam-my.sharepoint.com/personal/natallia_alieva_epam_com/_layouts/15/stream.aspx?id=%2Fpersonal%2Fnatallia%5Falieva%5Fepam%5Fcom%2FDocuments%2FMicrosoft%20Teams%20Chat%20Files%2F2023%2D04%2D11%5F11h58%5F43%2Emp4)

```
const ALLOWED_EMPTY_ELEMENTS = ['BR', 'IMG'];
```
- Create issue about cells selection highlighting. Sometimes there is wrong cells selection. [Video](https://epam-my.sharepoint.com/:v:/p/dzmitry_tamashevich/Ec4ZOs-rATZHjFYZWVxjczEB649FCoYFKDV_x3RxZiWAGA?e=4hswgA)
- Improve column removal if there is merged cells in the column. They should be divided or squeezed depending on particular case. [Video](https://epam-my.sharepoint.com/:v:/p/dzmitry_tamashevich/ESEWq--1q6dJl6AsQQChH-YB1_TtKjJtpW_W3kRhlpFZdw)
- Division of merged cell should works correctly. [Video](https://epam-my.sharepoint.com/personal/natallia_alieva_epam_com/_layouts/15/stream.aspx?id=%2Fpersonal%2Fnatallia%5Falieva%5Fepam%5Fcom%2FDocuments%2FMicrosoft%20Teams%20Chat%20Files%2F2023%2D05%2D20%5F22h45%5F45%2Emp4&ga=1)
- Create issue about resizing merged cells `uui-editor/src/plate/plugins/tablePlugin/Resizable.tsx`. [Video](https://epam-my.sharepoint.com/personal/dzmitry_tamashevich_epam_com/_layouts/15/stream.aspx?id=%2Fpersonal%2Fdzmitry%5Ftamashevich%5Fepam%5Fcom%2FDocuments%2FMicrosoft%20Teams%20Chat%20Files%2FScreen%20Recording%202023%2D05%2D19%20at%2018%2E42%2E38%2Emov&referrer=Teams%2ETEAMS%2DELECTRON&referrerScenario=p2p%5Fns%2Dbim&ga=1)
- Add vertical cell division