using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ThorgaApi.Migrations
{
    /// <inheritdoc />
    public partial class AddBilingualFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DescriptionEn",
                table: "SiteImages",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DescriptionNe",
                table: "SiteImages",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TitleEn",
                table: "SiteImages",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TitleNe",
                table: "SiteImages",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "BodyEn",
                table: "SiteContents",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "BodyNe",
                table: "SiteContents",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SummaryEn",
                table: "SiteContents",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SummaryNe",
                table: "SiteContents",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TitleEn",
                table: "SiteContents",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TitleNe",
                table: "SiteContents",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DescriptionEn",
                table: "PersonProfiles",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DescriptionNe",
                table: "PersonProfiles",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NameEn",
                table: "PersonProfiles",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NameNe",
                table: "PersonProfiles",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PositionEn",
                table: "PersonProfiles",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PositionNe",
                table: "PersonProfiles",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DescriptionEn",
                table: "SiteImages");

            migrationBuilder.DropColumn(
                name: "DescriptionNe",
                table: "SiteImages");

            migrationBuilder.DropColumn(
                name: "TitleEn",
                table: "SiteImages");

            migrationBuilder.DropColumn(
                name: "TitleNe",
                table: "SiteImages");

            migrationBuilder.DropColumn(
                name: "BodyEn",
                table: "SiteContents");

            migrationBuilder.DropColumn(
                name: "BodyNe",
                table: "SiteContents");

            migrationBuilder.DropColumn(
                name: "SummaryEn",
                table: "SiteContents");

            migrationBuilder.DropColumn(
                name: "SummaryNe",
                table: "SiteContents");

            migrationBuilder.DropColumn(
                name: "TitleEn",
                table: "SiteContents");

            migrationBuilder.DropColumn(
                name: "TitleNe",
                table: "SiteContents");

            migrationBuilder.DropColumn(
                name: "DescriptionEn",
                table: "PersonProfiles");

            migrationBuilder.DropColumn(
                name: "DescriptionNe",
                table: "PersonProfiles");

            migrationBuilder.DropColumn(
                name: "NameEn",
                table: "PersonProfiles");

            migrationBuilder.DropColumn(
                name: "NameNe",
                table: "PersonProfiles");

            migrationBuilder.DropColumn(
                name: "PositionEn",
                table: "PersonProfiles");

            migrationBuilder.DropColumn(
                name: "PositionNe",
                table: "PersonProfiles");
        }
    }
}
