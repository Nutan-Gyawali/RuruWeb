using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ThorgaApi.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // The database already contains the expected schema, so this migration is a baseline marker.
            migrationBuilder.Sql("SELECT 1");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // No-op for baseline migration.
        }
    }
}
