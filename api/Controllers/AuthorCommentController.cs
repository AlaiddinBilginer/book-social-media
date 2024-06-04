using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.AuthorComment;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/authorComment")]
    [ApiController]
    public class AuthorCommentController : ControllerBase
    {
        private readonly IAuthorCommentRepository _authorCommentRepo;
        private readonly IAuthorRepository _authorRepo;
        public AuthorCommentController(IAuthorCommentRepository authorCommentRepo, IAuthorRepository authorRepo)
        {
            _authorCommentRepo = authorCommentRepo;
            _authorRepo = authorRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] AuthorCommentQueryObject queryObject)
        {
            var comments = await _authorCommentRepo.GetAllAsync(queryObject);

            var commentDto = comments.Select(c => c.ToAuthorCommentDto());

            return Ok(commentDto);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var comment = await _authorCommentRepo.GetByIdAsync(id);

            if(comment == null)
            {
                return NotFound();
            }

            return Ok(comment.ToAuthorCommentDto());
        }

        [HttpPost("{authorId:int}")]
        public async Task<IActionResult> Create([FromRoute] int authorId, CreateAuthorCommentDto commentDto)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            if(!await _authorRepo.AuthorExist(authorId))
            {
                return BadRequest("Author does not exist");
            }

            var commentModel = commentDto.ToAuthorCommentFromCreateDto(authorId);
            await _authorCommentRepo.CreateAsync(commentModel);
            return CreatedAtAction(nameof(GetById), new { id = commentModel.Id }, commentModel.ToAuthorCommentDto());
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, UpdateAuthorCommentDto commentDto)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var comment = await _authorCommentRepo.UpdateAsync(id, commentDto.ToAuthorCommentFromUpdateDto());

            if(comment == null)
            {
                return NotFound("Author Comment does not exist");
            }

            return Ok(comment.ToAuthorCommentDto());
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var commentModel = await _authorCommentRepo.DeleteAsync(id);

            if(commentModel == null)
            {
                return NotFound("Author Comment does not exist");
            }

            return NoContent();
        }
    }
}