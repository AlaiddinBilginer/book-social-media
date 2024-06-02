using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Author;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/author")]
    [ApiController]
    public class AuthorController : ControllerBase
    {
        private readonly IAuthorRepository _authorRepo;
        public AuthorController(IAuthorRepository authorRepo)
        {
            _authorRepo = authorRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] QueryObject query) 
        {
            var authors = await _authorRepo.GetAllAsync(query);

            var authorDto = authors.Select(s => s.ToAuthorDto());

            return Ok(authorDto);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var author = await _authorRepo.GetByIdAsync(id);

            if(author == null)
            {
                return NotFound();
            }

            return Ok(author.ToAuthorDto());
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateAuthorRequestDto authorDto)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var authorModel = authorDto.ToAuthorFromCreateDto();
            await _authorRepo.CreateAsync(authorModel);
            return CreatedAtAction(nameof(GetById), new {id = authorModel.Id}, authorModel.ToAuthorDto());
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateAuthorRequestDto authorDto)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var authorModel = await _authorRepo.UpdateAsync(id, authorDto.ToAuthorFromUpdateDto());

            if(authorModel == null) 
            {
                return NotFound();
            }

            return Ok(authorModel.ToAuthorDto());
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var authorModel = await _authorRepo.DeleteAsync(id);

            if(authorModel == null) 
            {
                return NotFound();
            }

            return NoContent();
        }

    }
}