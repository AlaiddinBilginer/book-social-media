using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/bookComment")]
    [ApiController]
    public class BookCommentController : ControllerBase
    {
        private readonly IBookCommentRepository _bookCommentRepo;

        public BookCommentController(IBookCommentRepository bookCommentRepo)
        {
            _bookCommentRepo = bookCommentRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var comments = await _bookCommentRepo.GetAllAsync();

            var commentDto = comments.Select(s => s.ToBookCommentDto());

            return Ok(commentDto);
        }
    }
}