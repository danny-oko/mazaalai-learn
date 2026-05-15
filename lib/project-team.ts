/** App-area tags for team focus (shown as badges in the help hover card). */
export type TeamFocusArea =
  | "lessons"
  | "dictionary"
  | "reading"
  | "profile"
  | "dashboard"
  | "authorization";

export const TEAM_FOCUS_LABELS: Record<TeamFocusArea, string> = {
  lessons: "Lessons",
  dictionary: "Dictionary",
  reading: "Reading",
  profile: "Profile",
  dashboard: "Dashboard",
  authorization: "Authorization",
};

export type ProjectTeamMember = {
  name: string;
  membershipRole: string;
  contribution: string;
  imageUrl: string;
  focusAreas: TeamFocusArea[];
};

export const PROJECT_TEAM_MEMBERS: ProjectTeamMember[] = [
  {
    name: "O.Дэнни",
    membershipRole: "Project Manager",
    contribution: " ",
    imageUrl:
      "https://res.cloudinary.com/dll1at55f/image/upload/q_auto/f_auto/v1778760756/%D0%94%D1%8D%D0%BD%D0%BD%D0%B8_ltczif.jpg",
    focusAreas: ["dashboard", "lessons", "profile"],
  },
  {
    name: "T.Чинбаяр",
    membershipRole: "Lead Front-End developer",
    contribution: " ",
    imageUrl:
      "https://res.cloudinary.com/dll1at55f/image/upload/q_auto/f_auto/v1778760753/%D0%A7%D0%B8%D0%BD%D0%B1%D0%B0%D1%8F%D1%80_ssowuq.jpg",
    focusAreas: ["dashboard"],
  },
  {
    name: "Б.Сүх-Очир",
    membershipRole: "Lead Back-End developer",
    contribution: " ",
    imageUrl:
      "https://res.cloudinary.com/dll1at55f/image/upload/q_auto/f_auto/v1778760760/%D0%A1%D2%AF%D1%85-%D0%9E%D1%87%D0%B8%D1%80_yeqbdf.jpg",
    focusAreas: ["reading"],
  },
  {
    name: "Б.Оюунжаргал",
    membershipRole: "Developer",
    contribution: " ",
    imageUrl:
      "https://res.cloudinary.com/dll1at55f/image/upload/q_auto/f_auto/v1778760759/%D0%9E%D1%8E%D1%83%D0%BD%D0%B6%D0%B0%D1%80%D0%B3%D0%B0%D0%BB_tvrlwu.jpg",
    focusAreas: ["dictionary"],
  },
  {
    name: "Г.Амаржаргал",
    membershipRole: "Researcher & Developer",
    contribution: " ",
    imageUrl:
      "https://res.cloudinary.com/dll1at55f/image/upload/q_auto/f_auto/v1778765972/amarjargal_rg4qir.jpg",
    focusAreas: ["authorization"],
  },
  {
    name: "М.Алтанцоож",
    membershipRole: "Developer",
    contribution: " ",
    imageUrl:
      "https://res.cloudinary.com/dll1at55f/image/upload/q_auto/f_auto/v1778760776/%D0%90%D0%BB%D1%82%D0%B0%D0%BD%D1%86%D0%BE%D0%BE%D0%B6_miwiv5.jpg",
    focusAreas: [],
  },
];
