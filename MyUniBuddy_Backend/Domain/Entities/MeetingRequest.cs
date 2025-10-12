using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public enum MeetingRequestStatus
    {
        Pending = 0,
        Approved = 1,
        Rejected = 2
    }

    public class MeetingRequest
    {
        public Guid Id { get; set; }

        public Guid StudentId { get; set; }

        public DateTime RequestedDate { get; set; }

        public TimeSpan RequestedTime { get; set; }

        public string Topic { get; set; } = null!;

        public string Description { get; set; } = null!;

        // Admin response fields
        public MeetingRequestStatus Status { get; set; } = MeetingRequestStatus.Pending;

        public string? AdminNote { get; set; }

        public string? MeetLink { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? UpdatedAt { get; set; }
    }
}
