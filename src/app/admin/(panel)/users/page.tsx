import { db } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { createUser, setUserRole, setUserDisabled, resetPassword, deleteUser } from "@/lib/actions/admin/users";

export default async function UsersAdminPage() {
  const session = await requireSession("ADMIN");
  const users = await db.user.findMany({ orderBy: { createdAt: "asc" } });

  return (
    <>
      <div className="admin-head">
        <div>
          <h1 className="serif">Users</h1>
          <p className="sub">Admins manage everything; editors manage content and the inbox.</p>
        </div>
      </div>

      <div className="admin-grid">
        {users.map((u) => {
          const isSelf = u.id === session.sub;
          return (
            <details key={u.id} className="admin-editor">
              <summary>
                {u.name}
                <span className="muted">{u.email}</span>
                <span className={`chip-admin ${u.role === "ADMIN" ? "new" : ""}`}>{u.role}</span>
                {u.disabled && <span className="chip-admin">disabled</span>}
                {isSelf && <span className="chip-admin ok">you</span>}
              </summary>
              <div className="editor-body admin-form">
                <p style={{ fontSize: 12.5, color: "var(--muted)" }}>
                  Last sign-in: {u.lastLoginAt ? u.lastLoginAt.toISOString().slice(0, 16).replace("T", " ") : "never"}
                </p>
                {!isSelf && (
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <form action={setUserRole}>
                      <input type="hidden" name="id" value={u.id} />
                      <input type="hidden" name="role" value={u.role === "ADMIN" ? "EDITOR" : "ADMIN"} />
                      <button type="submit" className="btn-admin ghost small">
                        Make {u.role === "ADMIN" ? "editor" : "admin"}
                      </button>
                    </form>
                    <form action={setUserDisabled}>
                      <input type="hidden" name="id" value={u.id} />
                      <input type="hidden" name="disabled" value={u.disabled ? "false" : "true"} />
                      <button type="submit" className="btn-admin ghost small">
                        {u.disabled ? "Enable" : "Disable"}
                      </button>
                    </form>
                    <form action={deleteUser}>
                      <input type="hidden" name="id" value={u.id} />
                      <button type="submit" className="btn-admin danger small">
                        Delete
                      </button>
                    </form>
                  </div>
                )}
                <form action={resetPassword} className="admin-form" style={{ maxWidth: 420 }}>
                  <input type="hidden" name="id" value={u.id} />
                  <label>
                    New password (min 8 characters)
                    <input name="password" type="password" minLength={8} required autoComplete="new-password" />
                  </label>
                  <div>
                    <button type="submit" className="btn-admin small">
                      Reset password
                    </button>
                  </div>
                </form>
              </div>
            </details>
          );
        })}

        <details className="admin-editor">
          <summary>+ Add a user</summary>
          <div className="editor-body">
            <form action={createUser} className="admin-form" style={{ maxWidth: 520 }}>
              <div className="row">
                <label>
                  Name
                  <input name="name" required />
                </label>
                <label>
                  Email
                  <input name="email" type="email" required />
                </label>
              </div>
              <div className="row">
                <label>
                  Password (min 8 characters)
                  <input name="password" type="password" minLength={8} required autoComplete="new-password" />
                </label>
                <label>
                  Role
                  <select name="role" defaultValue="EDITOR">
                    <option value="EDITOR">Editor</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </label>
              </div>
              <div>
                <button type="submit" className="btn-admin">
                  Create user
                </button>
              </div>
            </form>
          </div>
        </details>
      </div>
    </>
  );
}
