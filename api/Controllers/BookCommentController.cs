using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.BookComment;
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
        private readonly IBookRepository _bookRepo;
        public BookCommentController(IBookCommentRepository bookCommentRepo, IBookRepository bookRepo)
        {
            _bookCommentRepo = bookCommentRepo;
            _bookRepo = bookRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var comments = await _bookCommentRepo.GetAllAsync();

            var commentDto = comments.Select(s => s.ToBookCommentDto());

            return Ok(commentDto);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var comment = await _bookCommentRepo.GetByIdAsync(id);

            if (comment == null)
            {
                return NotFound();
            }

            return Ok(comment.ToBookCommentDto());
        }

        [HttpPost("{bookId}")]
        public async Task<IActionResult> Create([FromRoute] int bookId, CreateBookCommentDto commentDto)
        {
            if (!await _bookRepo.BookExist(bookId))
            {
                return BadRequest("Book does not exist!");
            }

            var commentModel = commentDto.ToBookCommentFromCreateDto(bookId);
            await _bookCommentRepo.CreateAsync(commentModel);
            return CreatedAtAction(nameof(GetById), new { id = commentModel.Id }, commentModel.ToBookCommentDto());

        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, UpdateBookCommentDto commentDto) 
        {
            var comment = await _bookCommentRepo.UpdateAsync(id, commentDto.ToBookCommentFromUpdateDto());

            if(comment == null) {
                return NotFound("Comment does not exist");
            }

            return Ok(comment.ToBookCommentDto());
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id) 
        {
            var commentModel = await _bookCommentRepo.DeleteAsync(id);

            if(commentModel == null) {
                return NotFound("Comment does not exist");
            }

            return NoContent();
        }
    }
}