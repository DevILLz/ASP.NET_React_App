using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;
public class ActivitiesController : BaseAPIController
{
    private readonly IMediator mediator;

    public ActivitiesController(IMediator mediator)
    {
        this.mediator = mediator;
    }
    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities()
    {
        return await mediator.Send(new List.Query());
    }
    [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> GetActivity(Guid id)
    {
        return Ok();
    }
}
