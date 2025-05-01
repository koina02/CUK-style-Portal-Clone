import { Announcement } from "@/data/mockData";
import { format } from "date-fns";

interface AnnouncementListProps {
  announcements: Announcement[];
  limit?: number;
}

export default function AnnouncementList({ announcements, limit }: AnnouncementListProps) {
  const displayAnnouncements = limit ? announcements.slice(0, limit) : announcements;
  
  return (
    <div className="space-y-4">
      {displayAnnouncements.length === 0 ? (
        <p className="text-center text-muted-foreground py-4">No announcements available</p>
      ) : (
        displayAnnouncements.map(announcement => (
          <div 
            key={announcement.id} 
            className="border rounded-md p-4 transition-shadow hover:shadow-md"
          >
            <div className="flex justify-between items-start">
              <h3 className="font-medium">{announcement.title}</h3>
              <span className="text-xs text-muted-foreground">
                {format(new Date(announcement.date), "MMM d, yyyy")}
              </span>
            </div>
            <p className="text-sm mt-2 text-muted-foreground">
              {announcement.content}
            </p>
            <p className="text-xs mt-3 text-right font-medium text-campus-500">
              {announcement.author}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
