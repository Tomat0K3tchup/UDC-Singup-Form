const FOLDER_NAMES = {
  REC: "Recreational",
  GO_PRO: "GoPro",
};

const PACKAGE_NAMES = {
  FD: "fd",
  OW: "ow",
  CONED: "aow",
  GO_PRO: "goPro",
};

const FileManager = class FileManager {
  static getOrCreateCustomerFolder(data) {
    const currentWeekFolder = FileManager._getOrCreateWeekFolder();
    const subfolder = FileManager._subPkgFolder(currentWeekFolder, data.pkg);

    const folder = FileManager._searchCustomerFolder(subfolder, data);
    return folder ? folder : FileManager._createCustomerFolder(subfolder, data);
  }

  static _searchCustomerFolder(folder, data) {
    const folderIt = folder.getFoldersByName(`${data.first_name} ${data.last_name}`);
    if (!folderIt.hasNext()) return null;
    const returnFolder = folderIt.next();

    if (folderIt.hasNext()) throw new Error("Found multiple folders for the customer name");
    console.log("Found existing customer folder");
    return returnFolder;
  }

  static _createCustomerFolder(folder, data) {
    const name = `${data.first_name} ${data.last_name}`;
    const customerFolderName =
      data.pkg == PACKAGE_NAMES.FD ? `${name}` : `${data.instructor} - ${data.package} - ${name}`;
    return folder.createFolder(customerFolderName);
  }

  static _getOrCreateWeekFolder() {
    const propertyService = PropertiesService.getScriptProperties();

    // Get current date and week range
    const today = new Date();
    const { lastMonday, nextSunday } = FileManager._getWeekRange(today);

    // Retrieve the last update date from the Property Service
    const lastUpdateStr = propertyService.getProperty("lastWeekUpdateDate");
    const lastUpdateDate = lastUpdateStr ? new Date(lastUpdateStr) : null;

    // If last update date is before this week's Monday, create a new folder
    if (!!lastUpdateDate && lastUpdateDate >= lastMonday) {
      const currentWeekFolderId = propertyService.getProperty("currentWeekFolderId");
      const folder = DriveApp.getFolderById(currentWeekFolderId);
      console.info("Found valid week folder " + folder.getName());
      return folder;
    }

    const monthFolder = FileManager._getOrCreateMonthlyFolder(today, propertyService);
    return FileManager._createWeekFolder(monthFolder, propertyService, lastMonday, nextSunday);
  }

  static _createWeekFolder(monthFolder, propertyService, lastMonday, nextSunday) {
    const DD_MM_FORMATTER = new Intl.DateTimeFormat("en-US", { day: "2-digit", month: "short" });
    const folderName = `${DD_MM_FORMATTER.format(lastMonday)} - ${DD_MM_FORMATTER.format(nextSunday)}`;
    const newFolder = monthFolder.createFolder(folderName);

    if (!newFolder) {
      throw new Error("Couldn't create folder for current week.");
    }

    newFolder.createFolder(FOLDER_NAMES.REC);
    newFolder.createFolder(FOLDER_NAMES.GO_PRO);

    // Update Property Service with new folder ID and last update date
    propertyService.setProperty("lastWeekUpdateDate", nextSunday.toISOString());
    propertyService.setProperty("currentWeekFolderId", newFolder.getId());

    console.info("Created new week folder " + newFolder.getName());
    return newFolder;
  }

  static _getOrCreateMonthlyFolder(today, propertyService) {
    const firstDayOfThisMonth = FileManager._getFirstDayOfMonth(today);

    // Retrieve the last update date from the Property Service
    const lastUpdateDateString = propertyService.getProperty("lastMonthUpdateDate");
    const lastUpdateDate = lastUpdateDateString ? new Date(lastUpdateDateString) : null;

    // Check if the last update was before the first day of this month
    if (!!lastUpdateDate && lastUpdateDate > firstDayOfThisMonth) {
      const currentMonthFolderId = propertyService.getProperty("currentMonthFolderId");
      const folder = DriveApp.getFolderById(currentMonthFolderId);
      console.info("Found valid month folder " + folder.getName());
      return folder;
    }

    return FileManager._createMonthFolder(today, propertyService);
  }

  static _createMonthFolder(today, propertyService) {
    const storageFolderId = propertyService.getProperty("storageFolderId");
    const storageFolder = DriveApp.getFolderById(storageFolderId); // Change to desired parent folder if needed

    const MMMM_YYFormatter = new Intl.DateTimeFormat("en-US", { month: "long", year: "2-digit" });
    const folderName = MMMM_YYFormatter.format(today);
    const newFolder = storageFolder.createFolder(folderName);

    // Update Property Service with new folder ID and last update date
    propertyService.setProperty("lastMonthUpdateDate", today.toISOString());
    propertyService.setProperty("currentMonthFolderId", newFolder.getId());

    console.info("Created new month folder " + newFolder.getName());
    return newFolder;
  }

  static _subPkgFolder(weekFolder, pkg) {
    const folderName = pkg.toLowerCase().includes(PACKAGE_NAMES.GO_PRO)
      ? FOLDER_NAMES.GO_PRO
      : FOLDER_NAMES.REC;

    const folderIt = weekFolder.getFoldersByName(folderName);
    if (!folderIt.hasNext()) throw new Error("Failed to find a valid folder");
    return folderIt.next();
  }

  static archiveMonth() {
    var folder = DocsList.getFolder("path/to/folder");
    folder.createFile(Utilities.zip(folder.getFiles(), "newFiles.zip"));
  }

  static _getWeekRange(date) {
    const weekDayOfToday = date.getDay();
    const diffInDayToPreviousMonday = (weekDayOfToday === 0 ? -6 : 1) - weekDayOfToday; // Adjust for Sunday (0)
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

  static _getFirstDayOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }
};
