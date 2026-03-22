import { AppLogger } from "../Logger";
import { CustomerData } from "../types";

export const FOLDER_NAMES = {
  REC: "Recreational",
  GO_PRO: "GoPro",
} as const;

export const PACKAGE_NAMES = {
  FD: "fd",
  OW: "ow",
  CONED: "aow",
  GO_PRO: "goPro",
} as const;

type Folder = GoogleAppsScript.Drive.Folder;
type Properties = GoogleAppsScript.Properties.Properties;

export class FileManager {
  static getOrCreateCustomerFolder(data: CustomerData): Folder {
    const currentWeekFolder = FileManager._getOrCreateWeekFolder();
    const subfolder = FileManager._subPkgFolder(currentWeekFolder, data.pkg);

    const folder = FileManager._searchCustomerFolder(subfolder, data);
    return folder ? folder : FileManager._createCustomerFolder(subfolder, data);
  }

  static _searchCustomerFolder(folder: Folder, data: CustomerData): Folder | null {
    const folderIt = folder.getFoldersByName(`${data.first_name} ${data.last_name}`);
    if (!folderIt.hasNext()) return null;
    const returnFolder = folderIt.next();

    if (folderIt.hasNext()) throw new Error("Found multiple folders for the customer name");
    AppLogger.log("Found existing customer folder");
    return returnFolder;
  }

  static _createCustomerFolder(folder: Folder, data: CustomerData): Folder {
    const name = `${data.first_name} ${data.last_name}`;
    const customerFolderName =
      data.pkg == PACKAGE_NAMES.FD ? `${name}` : `${data.instructor} - ${data.package} - ${name}`;
    return folder.createFolder(customerFolderName);
  }

  static _getOrCreateWeekFolder(): Folder {
    const propertyService = PropertiesService.getScriptProperties();

    const today = new Date();
    const { lastMonday, nextSunday } = FileManager._getWeekRange(today);

    const lastUpdateStr = propertyService.getProperty("lastWeekUpdateDate");
    const lastUpdateDate = lastUpdateStr ? new Date(lastUpdateStr) : null;

    if (!!lastUpdateDate && lastUpdateDate >= lastMonday) {
      const currentWeekFolderId = propertyService.getProperty("currentWeekFolderId");
      const folder = DriveApp.getFolderById(currentWeekFolderId!);
      AppLogger.info("Found valid week folder " + folder.getName());
      return folder;
    }

    const monthFolder = FileManager._getOrCreateMonthlyFolder(today, propertyService);
    return FileManager._createWeekFolder(monthFolder, propertyService, lastMonday, nextSunday);
  }

  static _createWeekFolder(
    monthFolder: Folder,
    propertyService: Properties,
    lastMonday: Date,
    nextSunday: Date,
  ): Folder {
    const DD_MM_FORMATTER = new Intl.DateTimeFormat("en-US", { day: "2-digit", month: "short" });
    const folderName = `${DD_MM_FORMATTER.format(lastMonday)} - ${DD_MM_FORMATTER.format(nextSunday)}`;
    const newFolder = monthFolder.createFolder(folderName);

    if (!newFolder) {
      throw new Error("Couldn't create folder for current week.");
    }

    newFolder.createFolder(FOLDER_NAMES.REC);
    newFolder.createFolder(FOLDER_NAMES.GO_PRO);

    propertyService.setProperty("lastWeekUpdateDate", nextSunday.toISOString());
    propertyService.setProperty("currentWeekFolderId", newFolder.getId());

    AppLogger.info("Created new week folder " + newFolder.getName());
    return newFolder;
  }

  static _getOrCreateMonthlyFolder(today: Date, propertyService: Properties): Folder {
    const firstDayOfThisMonth = FileManager._getFirstDayOfMonth(today);

    const lastUpdateDateString = propertyService.getProperty("lastMonthUpdateDate");
    const lastUpdateDate = lastUpdateDateString ? new Date(lastUpdateDateString) : null;

    if (!!lastUpdateDate && lastUpdateDate > firstDayOfThisMonth) {
      const currentMonthFolderId = propertyService.getProperty("currentMonthFolderId");
      const folder = DriveApp.getFolderById(currentMonthFolderId!);
      AppLogger.info("Found valid month folder " + folder.getName());
      return folder;
    }

    return FileManager._createMonthFolder(today, propertyService);
  }

  static _createMonthFolder(today: Date, propertyService: Properties): Folder {
    const storageFolderId = propertyService.getProperty("storageFolderId");
    const storageFolder = DriveApp.getFolderById(storageFolderId!);

    const MMMM_YYFormatter = new Intl.DateTimeFormat("en-US", { month: "long", year: "2-digit" });
    const folderName = MMMM_YYFormatter.format(today);
    const newFolder = storageFolder.createFolder(folderName);

    propertyService.setProperty("lastMonthUpdateDate", today.toISOString());
    propertyService.setProperty("currentMonthFolderId", newFolder.getId());

    AppLogger.info("Created new month folder " + newFolder.getName());
    return newFolder;
  }

  static _subPkgFolder(weekFolder: Folder, pkg: string): Folder {
    const folderName = pkg.toLowerCase().includes(PACKAGE_NAMES.GO_PRO)
      ? FOLDER_NAMES.GO_PRO
      : FOLDER_NAMES.REC;

    const folderIt = weekFolder.getFoldersByName(folderName);
    if (!folderIt.hasNext()) throw new Error("Failed to find a valid folder");
    return folderIt.next();
  }

  static archiveMonth() {
    // @ts-expect-error DocsList is a removed GAS API — dead code, fix deferred
    var folder = DocsList.getFolder("path/to/folder");
    folder.createFile(Utilities.zip(folder.getFiles(), "newFiles.zip"));
  }

  static _getWeekRange(date: Date): { lastMonday: Date; nextSunday: Date } {
    const weekDayOfToday = date.getDay();
    const diffInDayToPreviousMonday = (weekDayOfToday === 0 ? -6 : 1) - weekDayOfToday;
    const lastMonday = new Date(date);
    lastMonday.setDate(lastMonday.getDate() + diffInDayToPreviousMonday);

    const lastMondayNoTime = new Date(
      lastMonday.getFullYear(),
      lastMonday.getMonth(),
      lastMonday.getDate(),
    );

    const nextSunday = new Date(lastMondayNoTime);
    nextSunday.setDate(lastMondayNoTime.getDate() + 6);

    return {
      lastMonday: lastMondayNoTime,
      nextSunday: nextSunday,
    };
  }

  static _getFirstDayOfMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }
}
