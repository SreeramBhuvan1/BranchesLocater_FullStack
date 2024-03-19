using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Task1.Migrations
{
    /// <inheritdoc />
    public partial class IncludedCurrencyToCity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Currency",
                table: "Branches");

            migrationBuilder.AddColumn<string>(
                name: "Currency",
                table: "Cities",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Cities",
                keyColumn: "CityId",
                keyValue: 1,
                column: "Currency",
                value: "CAD");

            migrationBuilder.UpdateData(
                table: "Cities",
                keyColumn: "CityId",
                keyValue: 2,
                column: "Currency",
                value: "CAD");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Currency",
                table: "Cities");

            migrationBuilder.AddColumn<string>(
                name: "Currency",
                table: "Branches",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Branches",
                keyColumn: "Id",
                keyValue: 1,
                column: "Currency",
                value: "CAD");

            migrationBuilder.UpdateData(
                table: "Branches",
                keyColumn: "Id",
                keyValue: 2,
                column: "Currency",
                value: "CAD");
        }
    }
}
