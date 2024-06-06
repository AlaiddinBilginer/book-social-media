using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Category;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/category")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepo;
        public CategoryController(ICategoryRepository categoryRepo)
        {
            _categoryRepo = categoryRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var categories = await _categoryRepo.GetAllAsync();

            var categoryDto = categories.Select(c => c.ToCategoryDto());

            return Ok(categoryDto);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var category = await _categoryRepo.GetByIdAsync(id);

            if(category == null)
            {
                return NotFound();
            }

            return Ok(category.ToCategoryDto());
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateCategoryDto categoryDto) 
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);   

            var categoryModel = categoryDto.ToCategoryFromCreateDto();
            await _categoryRepo.CreateAsync(categoryModel);
            return CreatedAtAction(nameof(GetById), new { id = categoryModel.Id}, categoryModel.ToCategoryDto());
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateCategoryDto categoryDto)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var categoryModel = await _categoryRepo.UpdateAsync(id, categoryDto.ToCategoryFromUpdateDto());

            if(categoryModel == null)
            {
                return NotFound();
            }

            return Ok(categoryModel.ToCategoryDto());
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var categoryModel = await _categoryRepo.DeleteAsync(id);

            if(categoryModel == null)
            {
                return NotFound();
            }

            return NoContent();
        }

    }
}