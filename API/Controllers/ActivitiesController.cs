using Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers;
public class ActivitiesController : BaseAPIController
{
    private readonly DataContext context;

    public ActivitiesController(DataContext context)
    {
        this.context = context;
    }
    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities()
    {
        return await context.Activities.ToListAsync();
    }
    [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> GetActivity(Guid id)
    {
        return await context.Activities.FindAsync(id);
    }
}
