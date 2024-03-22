using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Task1.Migrations
{
    /// <inheritdoc />
    public partial class ChangedNaming : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "61c8f4af-5b71-4551-8915-2a45bcd900e6");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ec4fc128-690a-4fe8-a80f-987df0d2e112");

            migrationBuilder.DropColumn(
                name: "BU_Codes",
                table: "Branches");

            migrationBuilder.RenameColumn(
                name: "Opened_dt",
                table: "Branches",
                newName: "OpenedDate");

            migrationBuilder.RenameColumn(
                name: "Business_Hours",
                table: "Branches",
                newName: "BusinessHours");

            migrationBuilder.AddColumn<string>(
                name: "BuCode",
                table: "Branches",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "a57bd4a5-07a7-4a64-8aa0-568e1479d3e1", null, "Administrator", "ADMINISTRATOR" },
                    { "b3f2112e-9956-4a02-8d7f-e4ca667b0803", null, "User", "USER" }
                });

            migrationBuilder.UpdateData(
                table: "Branches",
                keyColumn: "Id",
                keyValue: 1,
                column: "BuCode",
                value: "AB100");

            migrationBuilder.UpdateData(
                table: "Branches",
                keyColumn: "Id",
                keyValue: 2,
                column: "BuCode",
                value: "ABACH");

            migrationBuilder.UpdateData(
                table: "Branches",
                keyColumn: "Id",
                keyValue: 3,
                column: "BuCode",
                value: "ABAIR");

            migrationBuilder.UpdateData(
                table: "Branches",
                keyColumn: "Id",
                keyValue: 4,
                column: "BuCode",
                value: "ABCA1");

            migrationBuilder.UpdateData(
                table: "Branches",
                keyColumn: "Id",
                keyValue: 5,
                column: "BuCode",
                value: "ABCA2");

            migrationBuilder.CreateIndex(
                name: "IX_Branches_BuCode",
                table: "Branches",
                column: "BuCode",
                unique: true,
                filter: "[BuCode] IS NOT NULL");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Branches_BuCode",
                table: "Branches");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a57bd4a5-07a7-4a64-8aa0-568e1479d3e1");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b3f2112e-9956-4a02-8d7f-e4ca667b0803");

            migrationBuilder.DropColumn(
                name: "BuCode",
                table: "Branches");

            migrationBuilder.RenameColumn(
                name: "OpenedDate",
                table: "Branches",
                newName: "Opened_dt");

            migrationBuilder.RenameColumn(
                name: "BusinessHours",
                table: "Branches",
                newName: "Business_Hours");

            migrationBuilder.AddColumn<string>(
                name: "BU_Codes",
                table: "Branches",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "61c8f4af-5b71-4551-8915-2a45bcd900e6", null, "User", "USER" },
                    { "ec4fc128-690a-4fe8-a80f-987df0d2e112", null, "Administrator", "ADMINISTRATOR" }
                });

            migrationBuilder.UpdateData(
                table: "Branches",
                keyColumn: "Id",
                keyValue: 1,
                column: "BU_Codes",
                value: "AB100");

            migrationBuilder.UpdateData(
                table: "Branches",
                keyColumn: "Id",
                keyValue: 2,
                column: "BU_Codes",
                value: "ABACH");

            migrationBuilder.UpdateData(
                table: "Branches",
                keyColumn: "Id",
                keyValue: 3,
                column: "BU_Codes",
                value: "ABAIR");

            migrationBuilder.UpdateData(
                table: "Branches",
                keyColumn: "Id",
                keyValue: 4,
                column: "BU_Codes",
                value: "ABCA1");

            migrationBuilder.UpdateData(
                table: "Branches",
                keyColumn: "Id",
                keyValue: 5,
                column: "BU_Codes",
                value: "ABCA2");
        }
    }
}
