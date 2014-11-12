package the_voice_of_people;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.fileupload.util.Streams;

//@MultipartConfig
public class FileUploader extends HttpServlet {
	private static final long serialVersionUID = 1L;
        private static final String SAVE_DIR = "/img/post_images";
	protected void doPost(HttpServletRequest request,
						  HttpServletResponse response) 
						  throws ServletException, IOException {
		
		String ajaxUpdateResult = "";
		String appPath = request.getServletContext().getRealPath("");
                // constructs path of the directory to save uploaded file
                String savePath = appPath + File.separator + SAVE_DIR;
                HttpSession session = request.getSession(true);
                // creates the save directory if it does not exists
                File fileSaveDir = new File(savePath);
                if (!fileSaveDir.exists()) {
                    fileSaveDir.mkdir();
                }
		try {
			List<FileItem> items = new ServletFileUpload(new DiskFileItemFactory()).parseRequest(request);
			
			for (FileItem item : items) {
				
                            if (item.isFormField()) {
                                    ajaxUpdateResult += "Field " + item.getFieldName() + " with value: " + item.getString() + " is successfully read\n\r";
                            }else{
                                
                                String fileName = item.getName();
                                InputStream content = item.getInputStream();
                                File file = new File("/img/post_images");
                                item.write(file);
                                response.setContentType("text/plain");
                                response.setCharacterEncoding("UTF-8");

                                // Do whatever with the content InputStream.
                                System.out.println(Streams.asString(content));

                                ajaxUpdateResult += "File " + fileName + " is successfully uploaded\n\r";
                            }
			}
		} catch (FileUploadException e) {
			throw new ServletException("Parsing file upload failed.", e);
		} catch (Exception ex) {
                Logger.getLogger(FileUploader.class.getName()).log(Level.SEVERE, null, ex);
            }

		response.getWriter().print(ajaxUpdateResult);
	}

}
