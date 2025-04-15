interface TimelineItemProps {
  date: string;
  title: string;
  company: string;
  location: string;
  responsibilities: string[];
}

export function TimelineItem({ date, title, company, location, responsibilities }: TimelineItemProps) {
  return (
    <div className="timeline-item relative mb-12 pl-8">
      <div className="before:content-[''] before:absolute before:left-[-8px] before:top-0 before:w-4 before:h-4 before:rounded-full before:bg-primary before:border-[3px] before:border-white">
        <div className="mb-2">
          <span className="font-inter text-xs font-semibold py-1 px-3 bg-blue-100 text-primary rounded-full">
            {date}
          </span>
        </div>
        <h3 className="font-inter font-semibold text-xl">{title}</h3>
        <p className="text-gray-700 font-medium">{company}</p>
        <p className="text-gray-600 mb-4">{location}</p>
        <ul className="space-y-2 text-gray-700">
          {responsibilities.map((responsibility, index) => (
            <li key={index} className="flex items-start">
              <i className="fas fa-check-circle text-primary mt-1 mr-2" />
              <span>{responsibility}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
