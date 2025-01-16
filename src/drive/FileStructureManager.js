function getOrCreateWeekFolder(date) {
  const propertyService = PropertiesService.getScriptProperties();

  // Get current date and week range
  const today = new Date();
  const { lastMonday, nextSunday } = _getWeekRange(today);

  // Retrieve the last update date from the Property Service
  const lastUpdateDateString = propertyService.getProperty("lastWeekUpdateDate");
  const lastUpdateDate = lastUpdateDateString ? new Date(lastUpdateDateString) : null;

  // If last update date is before this week's Monday, create a new folder
  if (!!lastUpdateDate && lastUpdateDate >= lastMonday) {
    const currentWeekFolderId = propertyService.getProperty("currentWeekFolderId");
    const folder = DriveApp.getFolderById(currentWeekFolderId);
    Logger.log("Found valid week folder " + folder.getName());
    return folder;
  }

  const monthFolder = getOrCreateMonthlyFolder(today, propertyService);

  const DD_MM_FORMATTER = new Intl.DateTimeFormat("en-US", { day: "2-digit", month: "short" });
  const folderName = `${DD_MM_FORMATTER.format(lastMonday)} - ${DD_MM_FORMATTER.format(nextSunday)}`;
  const newFolder = monthFolder.createFolder(folderName);

  if (!newFolder) {
    throw new Error("Couldn't create folder for current week.");
  }

  newFolder.createFolder("Courses");
  newFolder.createFolder("Fun Divers");

  // Update Property Service with new folder ID and last update date
  propertyService.setProperty("lastWeekUpdateDate", today.toISOString());
  propertyService.setProperty("currentWeekFolderId", newFolder.getId());

  Logger.log("Created new week folder " + newFolder.getName());
  return newFolder;
}

function getOrCreateMonthlyFolder(today, propertyService) {
  const firstDayOfThisMonth = _getFirstDayOfMonth(today);

  // Retrieve the last update date from the Property Service
  const lastUpdateDateString = propertyService.getProperty("lastMonthUpdateDate");
  const lastUpdateDate = lastUpdateDateString ? new Date(lastUpdateDateString) : null;

  // Check if the last update was before the first day of this month
  if (!!lastUpdateDate && lastUpdateDate > firstDayOfThisMonth) {
    const currentMonthFolderId = propertyService.getProperty("currentMonthFolderId");
    const folder = DriveApp.getFolderById(currentMonthFolderId);
    Logger.log("Found valid month folder " + folder.getName());
    return folder;
  }

  const storageFolderId = propertyService.getProperty("storageFolderId");
  const storageFolder = DriveApp.getFolderById(storageFolderId); // Change to desired parent folder if needed

  const MMMM_YYFormatter = new Intl.DateTimeFormat("en-US", { month: "long", year: "2-digit" });
  const folderName = MMMM_YYFormatter.format(today);
  const newFolder = storageFolder.createFolder(folderName);

  // Update Property Service with new folder ID and last update date
  propertyService.setProperty("lastMonthUpdateDate", today.toISOString());
  propertyService.setProperty("currentMonthFolderId", newFolder.getId());

  Logger.log("Created new month folder " + newFolder.getName());
  return newFolder;
}

function getFolderNameFromPackage(package) {
  return package.toLowerCase().includes("fd") ? "Fun Divers" : "Courses";
}

function createCustomerFolder(data) {
  console.log(data);
  const currentWeekFolder = getOrCreateWeekFolder(data.date);
  const folderName = getFolderNameFromPackage(data.package);

  const folderIt = currentWeekFolder.getFoldersByName(folderName);
  if (!folderIt.hasNext()) throw new Error("Failed to find a valid folder");
  const folder = folderIt.next();
  const name = `${data.first_name} ${data.last_name}`;
  // FIXME: package might need to be cleaned up
  const customerFolderName =
    folderName == "Fun Divers" ? `${name}` : `${data.instructor} - ${data.package} - ${name}`;
  const customerFolder = folder.createFolder(customerFolderName);

  return customerFolder;
}

function getOrCreateCustomerFolder(name, data) {
  /**
   * return getCurrentWeekFolder.searchFolder(name) ? createrCustomerFolder
   */
}

function archiveMonth() {
  var folder = DocsList.getFolder("path/to/folder");
  folder.createFile(Utilities.zip(folder.getFiles(), "newFiles.zip"));
}

function _getWeekRange(date) {
  const day = date.getDay();
  const diffToMonday = (day === 0 ? -6 : 1) - day; // Adjust for Sunday (0)
  const lastMonday = new Date(date);
  lastMonday.setDate(lastMonday.getDate() + diffToMonday);

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

function _getFirstDayOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}
