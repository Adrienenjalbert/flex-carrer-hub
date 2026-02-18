// Helper function to generate TOC items from sections
export interface TOCItem {
  id: string;
  title: string;
  level: number;
}

export const generateTOCFromSections = (sections: { heading: string }[]): TOCItem[] => {
  return sections.map((section, index) => ({
    id: `section-${index}`,
    title: section.heading,
    level: 1
  }));
};

