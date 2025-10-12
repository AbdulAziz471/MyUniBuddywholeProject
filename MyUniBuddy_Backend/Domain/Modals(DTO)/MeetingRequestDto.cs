using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Modals_DTO_
{
    public class MeetingRequestDto
    {
        public Guid? Id { get; set; }
        public Guid StudentId { get; set; }
        public DateTime RequestedDate { get; set; }
        public TimeSpan RequestedTime { get; set; }
        public string Topic { get; set; } = null!;
        public string Description { get; set; } = null!;
        public MeetingRequestStatus Status { get; set; }
        public string? AdminNote { get; set; }
        public string? MeetLink { get; set; }
    }
}
